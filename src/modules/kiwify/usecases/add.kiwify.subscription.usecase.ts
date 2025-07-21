import { inject, injectable } from 'tsyringe';
import { AddKiwifySubscriptionUseCaseInterface } from './interfaces/add.kiwify.subscription.usecase.interface';
import { CreateLogUseCaseInterface } from '../../../shared/usecases/interfaces/create.log.use.case.interface';
import { KiwifyWebhookEventAddType } from './enums';
import { FindOneUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/find.one.user.use.case.interface';
import { CreateUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/create.user.use.case.interface';
import { UpdateUserUseCaseInterface } from '../../../modules/users/usecases/interfaces/update.user.use.case.interface';
import { validateEmail } from '../../../utils/util';
import { MailInterface } from '../../../shared/email/mail.interface';
import { env } from '../../../utils/env';
import { User } from '../../../modules/users/DTOs/user';

@injectable()
export class AddKiwifySubscriptionUseCase
  implements AddKiwifySubscriptionUseCaseInterface
{
  constructor(
    @inject('CreateLogUseCase')
    private readonly _createLogUseCase: CreateLogUseCaseInterface,
    @inject('FindOneUserUseCase')
    private readonly _findOneUserUseCaseInterface: FindOneUserUseCaseInterface,
    @inject('CreateUserUseCase')
    private readonly _createUserUseCaseInterface: CreateUserUseCaseInterface,
    @inject('UpdateUserUseCase')
    private readonly _updateUserUseCaseInterface: UpdateUserUseCaseInterface,
    @inject('DuplicatedSubscribeMail')
    private readonly _duplicatedSubscribeMail: MailInterface,
    @inject('RenewalUserMail')
    private readonly _renewalUserMail: MailInterface,
  ) {}

  public async execute(data: any): Promise<void> {
    console.log('Executing AddKiwifySubscriptionUseCase with data:', data);
    await this._createLogUseCase.execute({
      type: 'kiwify_subscription_add',
      log: data,
    });
    console.log('Log created successfully');
    const {
      Customer,
      Subscription: { next_payment },
      webhook_event_type,
    } = data;
    console.log('Extract util data:', {
      Customer,
      next_payment,
      webhook_event_type,
    });
    if (
      ![
        KiwifyWebhookEventAddType.ORDER_APPROVED,
        KiwifyWebhookEventAddType.SUBSCRIPTION_RENEWED,
      ].includes(webhook_event_type)
    ) {
      console.error('Invalid webhook event type:', webhook_event_type);
      return;
    }
    console.log('Before validating email');
    validateEmail(Customer.email);
    console.log('Validated email:', Customer.email);
    let user: User | null = null;
    try {
      user = await this._findOneUserUseCaseInterface.execute({
        filter: { email: Customer.email },
      });
    } catch (error) {
      console.log('User not found', error);
    }
    if (!user) {
      console.log('User not found, creating new user');
      await this._createUserUseCaseInterface.execute({
        name: Customer.full_name ?? Customer.first_name ?? Customer.email,
        email: Customer.email,
        expiredAt: new Date(next_payment).toISOString(),
        phone: Customer.mobile,
      });
      console.log('User created successfully and returning');
      return;
    }
    if (webhook_event_type === KiwifyWebhookEventAddType.ORDER_APPROVED) {
      const userExpiredAt = new Date(user.expired_at);
      const today = new Date();
      if (userExpiredAt > today) {
        console.log('User subscription is still valid, no action needed');
        await this._duplicatedSubscribeMail.send({
          name: user.name,
          email: user.email,
          link: env({ key: 'FRONT_URL' }),
        });
        console.log('Duplicated subscription email sent');
        return;
      }
    }
    console.log('User already exists, updating user data');
    await this._updateUserUseCaseInterface.execute({
      id: user.id,
      name: user.name,
      email: user.email,
      expiredAt: new Date(next_payment).toISOString(),
    });
    console.log('User updated successfully');
    await this._renewalUserMail.send({
      name: user.name,
      email: user.email,
      link: env({ key: 'FRONT_URL' }),
    });
    console.log('Renewal subscription email sent and finished execution');
  }
}
