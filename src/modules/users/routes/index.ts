import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { UserController } from '../controllers/user.controller';
import { createUserSchema } from './schemas/create.user.schema';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { UserProfileController } from '../controllers/user.profile.controller';
import { profileUserSchema } from './schemas/profile.user.schema';

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);
  const userProfileController = container.resolve(UserProfileController);

  app.post(
    '/users',
    { schema: createUserSchema, preHandler: authMiddleware },
    (request, reply) =>
      userController.create(request as FastifyAuthRequest, reply),
  );

  app.get(
    '/users/profile',
    { schema: profileUserSchema, preHandler: authMiddleware },
    (request, reply) =>
      userProfileController.findOne(request as FastifyAuthRequest, reply),
  );
};
