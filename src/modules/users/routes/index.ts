import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { UserController } from '../controllers/user.controller';
import { createUserSchema } from './schemas/create.user.schema';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { paginateUsersSchema } from './schemas/paginate.user.schema';
import { canMiddleware } from '../../../middlewares/can.middleware';
import { findOneUserSchema } from './schemas/find.one.user.schema';
import { updateUserSchema } from './schemas/update.user.schema';
import { deleteUserSchema } from './schemas/delete.user.schema';

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);

  app.post(
    '/users',
    { schema: createUserSchema, preHandler: authMiddleware },
    (request, reply) =>
      userController.create(request as FastifyAuthRequest, reply),
  );

  app.get(
    '/users',
    {
      schema: paginateUsersSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => userController.findAll(request, reply),
  );

  app.get(
    '/users/:id',
    { schema: findOneUserSchema, preHandler: [authMiddleware] },
    (request, reply) => userController.findOne(request, reply),
  );

  app.patch(
    '/users/:id',
    { schema: updateUserSchema, preHandler: [authMiddleware] },
    (request, reply) => userController.update(request, reply),
  );

  app.delete(
    '/users/:id',
    { schema: deleteUserSchema, preHandler: [authMiddleware] },
    (request, reply) => userController.delete(request, reply),
  );
};
