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
import { UserAuctionPropertyFilterController } from '../controllers/user.auction.property.filter.controller';
import { createUserAuctionPropertyFilterSchema } from './schemas/create.user.auction.property.filter.schema';
import { findAllUserAuctionPropertyFilterSchema } from './schemas/find.all.user.auction.property.filter.schema';
import { deleteUserAuctionPropertyFilterSchema } from './schemas/delete.user.auction.property.filter.schema';

export const auctionPropertyRoutesModule = (app: FastifyTypedInstance) => {
  const auctionPropertyController = container.resolve(
    AuctionPropertyController,
  );

  const auctionPropertyFavoriteController = container.resolve(
    AuctionPropertyFavoriteController,
  );

  const userAuctionPropertyFilterController = container.resolve(
    UserAuctionPropertyFilterController,
  );

  app.get(
    '/auction-properties',
    {
      schema: paginateAuctionPropertiesSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      auctionPropertyController.findAll(request as FastifyAuthRequest, reply),
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

  app.post(
    '/auction-properties/filter',
    {
      schema: createUserAuctionPropertyFilterSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      userAuctionPropertyFilterController.create(
        request as FastifyAuthRequest,
        reply,
      ),
  );

  app.get(
    '/auction-properties/filter',
    {
      schema: findAllUserAuctionPropertyFilterSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      userAuctionPropertyFilterController.findAll(
        request as FastifyAuthRequest,
        reply,
      ),
  );

  app.delete(
    '/auction-properties/filter/:id',
    {
      schema: deleteUserAuctionPropertyFilterSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      userAuctionPropertyFilterController.delete(request, reply),
  );
};
