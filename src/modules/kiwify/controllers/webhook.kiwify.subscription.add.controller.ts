import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateLogUseCaseInterface } from '../../../shared/usecases/interfaces/create.log.use.case.interface';
import { CreateWebhookResponse } from './responses/create.webhook.response';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class WebhookKiwifySubscriptionAddController {
  constructor(
    @inject('CreateLogUseCase')
    private readonly _createLogUseCase: CreateLogUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      await this._createLogUseCase.execute({
        type: 'kiwify_subscription_add',
        log: request.body,
      });
      return CreateWebhookResponse.success({ reply });
    } catch (error) {
      console.error('Error processing Kiwify subscription removal:', error);
      throw error;
    }
  }
}
