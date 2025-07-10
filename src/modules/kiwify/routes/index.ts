import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { WebhookKiwifySubscriptionAddController } from '../controllers/webhook.kiwify.subscription.add.controller';
import { WebhookKiwifySubscriptionRemoveController } from '../controllers/webhook.kiwify.subscription.remove.controller';

export const kiwifyRoutesModule = (app: FastifyTypedInstance) => {
  const webhookKiwifySubscriptionAddController = container.resolve(
    WebhookKiwifySubscriptionAddController,
  );
  const webhookKiwifySubscriptionRemoveController = container.resolve(
    WebhookKiwifySubscriptionRemoveController,
  );

  app.post('/webhook/kiwify/subscription/add', (request, reply) =>
    webhookKiwifySubscriptionAddController.create(
      request as FastifyAuthRequest,
      reply,
    ),
  );

  app.post('/webhook/kiwify/subscription/remove', (request, reply) =>
    webhookKiwifySubscriptionRemoveController.create(
      request as FastifyAuthRequest,
      reply,
    ),
  );
};
