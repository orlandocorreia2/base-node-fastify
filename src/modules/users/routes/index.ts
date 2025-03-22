import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { UserController } from '../controllers/user.controller';
import { createUserSchema } from './schemas/create.user.schema';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { canMiddleware } from '../../../middlewares/can.middleware';
import { paginateUsersSchema } from './schemas/paginate.user.schema';
import { findOneUserSchema } from './schemas/find.one.user.schema';
import { updateUserSchema } from './schemas/update.user.schema';
import { deleteUserSchema } from './schemas/delete.user.schema';
import { UsersBatchController } from '../controllers/users.batch.controller';
import { createUsersBatchSchema } from './schemas/create.users.batch.schema';
import { UserProfileController } from '../controllers/user.profile.controller';
import { getUserProfileSchema } from './schemas/get.user.profile.schema';
import { UserPasswordController } from '../controllers/user.password.controller';
import { resetUserPasswrodSchema } from './schemas/reset.user.password.schema';

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);
  const usersBatchController = container.resolve(UsersBatchController);
  const userProfileController = container.resolve(UserProfileController);
  const userPasswordController = container.resolve(UserPasswordController);

  app.post(
    '/users',
    { schema: createUserSchema, preHandler: [authMiddleware, canMiddleware] },
    (request, reply) =>
      userController.create(request as FastifyAuthRequest, reply),
  );

  app.post(
    '/users/batch',
    {
      schema: createUsersBatchSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      usersBatchController.create(request as FastifyAuthRequest, reply),
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
    { schema: findOneUserSchema, preHandler: [authMiddleware, canMiddleware] },
    (request, reply) => userController.findOne(request, reply),
  );

  app.patch(
    '/users/:id',
    { schema: updateUserSchema, preHandler: [authMiddleware, canMiddleware] },
    (request, reply) => userController.update(request, reply),
  );

  app.delete(
    '/users/:id',
    { schema: deleteUserSchema, preHandler: [authMiddleware, canMiddleware] },
    (request, reply) => userController.delete(request, reply),
  );

  app.get(
    '/users/profile',
    { schema: getUserProfileSchema, preHandler: [authMiddleware] },
    (request, reply) =>
      userProfileController.findOne(request as FastifyAuthRequest, reply),
  );

  app.patch(
    '/users/reset-password',
    { schema: resetUserPasswrodSchema },
    (request, reply) => userPasswordController.update(request, reply),
  );
};
