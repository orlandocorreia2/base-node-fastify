import { inject, injectable } from 'tsyringe';
import { CreateLogUseCaseInterface } from '../../../shared/usecases/interfaces/create.log.use.case.interface';
import { KiwifyWebhookEventRemoveType } from './enums';
import { FindOneUserUseCaseInterface } from '../../users/usecases/interfaces/find.one.user.use.case.interface';
import { UpdateUserUseCaseInterface } from '../../users/usecases/interfaces/update.user.use.case.interface';
import { validateEmail } from '../../../utils/util';
import { RemoveKiwifySubscriptionUseCaseInterface } from './interfaces/remove.kiwify.subscription.usecase.interface';

@injectable()
export class RemoveKiwifySubscriptionUseCase
  implements RemoveKiwifySubscriptionUseCaseInterface
{
  constructor(
    @inject('CreateLogUseCase')
    private readonly _createLogUseCase: CreateLogUseCaseInterface,
    @inject('FindOneUserUseCase')
    private readonly _findOneUserUseCaseInterface: FindOneUserUseCaseInterface,
    @inject('UpdateUserUseCase')
    private readonly _updateUserUseCaseInterface: UpdateUserUseCaseInterface,
  ) {}

  public async execute(data: any): Promise<void> {
    console.log('Executing RemoveKiwifySubscriptionUseCase with data:', data);
    await this._createLogUseCase.execute({
      type: 'kiwify_subscription_remove',
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
      !Object.keys(KiwifyWebhookEventRemoveType).includes(webhook_event_type)
    ) {
      console.error('Invalid webhook event type:', webhook_event_type);
      return;
    }
    console.log('Before validating email');
    validateEmail(Customer.email);
    console.log('Validated email:', Customer.email);
    const user = await this._findOneUserUseCaseInterface.execute({
      filter: { email: Customer.email },
    });
    console.log('User found?', user);
    if (!user) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log('Setting user expired_at to yesterday:', yesterday);
    await this._updateUserUseCaseInterface.execute({
      id: user.id,
      name: user.name,
      email: user.email,
      expiredAt: yesterday.toISOString(),
    });
    console.log('User updated successfully and finished execution');
  }
}
