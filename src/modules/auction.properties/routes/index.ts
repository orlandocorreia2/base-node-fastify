import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { AuctionPropertyController } from '../controllers/auction.property.controller';
import { authMiddleware } from 'middlewares/auth.middleware';
import { canMiddleware } from 'middlewares/can.middleware';
import { createAuctionPropertiesBatchSchema } from './schemas/create.auction.properties.batch.schema';

export const auctionPropertyRoutesModule = (app: FastifyTypedInstance) => {
  const auctionPropertyController = container.resolve(
    AuctionPropertyController,
  );

  app.post(
    '/auction-properties/batch',
    {
      schema: createAuctionPropertiesBatchSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      auctionPropertyController.create(request as FastifyAuthRequest, reply),
  );
};
