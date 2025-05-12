import { container } from 'tsyringe';
import { FastifyTypedInstance } from '../../../types/types';
import { AuctionPropertyController } from '../controllers/auction.property.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { canMiddleware } from '../../../middlewares/can.middleware';
import { paginateAuctionPropertiesSchema } from './schemas/paginate.auction.properties.schema';
import { findOneAuctionPropertySchema } from './schemas/find.one.auction_property.schema';

export const auctionPropertyRoutesModule = (app: FastifyTypedInstance) => {
  const auctionPropertyController = container.resolve(
    AuctionPropertyController,
  );

  app.get(
    '/auction-properties',
    {
      schema: paginateAuctionPropertiesSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => auctionPropertyController.findAll(request, reply),
  );

  app.get(
    '/auction-properties/:id',
    {
      schema: findOneAuctionPropertySchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => auctionPropertyController.findOne(request, reply),
  );
};
