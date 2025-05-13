import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { AuctionPropertyController } from '../controllers/auction.property.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { canMiddleware } from '../../../middlewares/can.middleware';
import { paginateAuctionPropertiesSchema } from './schemas/paginate.auction.properties.schema';
import { findOneAuctionPropertySchema } from './schemas/find.one.auction.property.schema';
import { AuctionPropertyFavoriteController } from '../controllers/auction.property.favorite.controller';
import { favoriteAuctionPropertySchema } from './schemas/favorite.auction.property.schema';
import { unFavoriteAuctionPropertySchema } from './schemas/unfavorite.auction.property.schema';

export const auctionPropertyRoutesModule = (app: FastifyTypedInstance) => {
  const auctionPropertyController = container.resolve(
    AuctionPropertyController,
  );

  const auctionPropertyFavoriteController = container.resolve(
    AuctionPropertyFavoriteController,
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

  app.post(
    '/auction-properties/:id/favorite',
    {
      schema: favoriteAuctionPropertySchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      auctionPropertyFavoriteController.create(
        request as FastifyAuthRequest,
        reply,
      ),
  );

  app.delete(
    '/auction-properties/:id/unfavorite',
    {
      schema: unFavoriteAuctionPropertySchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      auctionPropertyFavoriteController.delete(
        request as FastifyAuthRequest,
        reply,
      ),
  );
};
