import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateWebhookResponse } from './responses/create.webhook.response';
import { AddKiwifySubscriptionUseCaseInterface } from '../usecases/interfaces/add.kiwify.subscription.usecase.interface';

@injectable()
export class WebhookKiwifySubscriptionAddController {
  constructor(
    @inject('AddKiwifySubscriptionUseCase')
    private readonly _addKiwifySubscriptionUseCase: AddKiwifySubscriptionUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      await this._addKiwifySubscriptionUseCase.execute(request.body);
      return CreateWebhookResponse.success({ reply });
    } catch (error) {
      console.error('Error processing Kiwify subscription removal:', error);
      throw error;
    }
  }
}
