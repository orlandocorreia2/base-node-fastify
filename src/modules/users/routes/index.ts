import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { UserController } from '../controllers/user.controller';
import { createUserSchema } from './schemas/create.user.schema';
import { authMiddleware } from '../../../middlewares/auth.middleware';

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);

  app.post(
    '/users',
    { schema: createUserSchema, preHandler: authMiddleware },
    (request, reply) =>
      userController.create(request as FastifyAuthRequest, reply),
  );

  // app.get(
  //   '/users/profile',
  //   { schema: profileUserSchema, preHandler: authMiddleware },
  //   request => {
  //     return request.user;
  //   },
  // );
};
