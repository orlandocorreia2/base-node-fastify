import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateWebhookResponse } from './responses/create.webhook.response';
import { RemoveKiwifySubscriptionUseCaseInterface } from '../usecases/interfaces/remove.kiwify.subscription.usecase.interface';

@injectable()
export class WebhookKiwifySubscriptionRemoveController {
  constructor(
    @inject('RemoveKiwifySubscriptionUseCase')
    private readonly _removeKiwifySubscriptionUseCase: RemoveKiwifySubscriptionUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      await this._removeKiwifySubscriptionUseCase.execute(request.body);
      return CreateWebhookResponse.success({ reply });
    } catch (error) {
      console.error('Error processing Kiwify subscription removal:', error);
      throw error;
    }
  }
}
