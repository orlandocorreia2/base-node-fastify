import { container } from 'tsyringe';
import { FastifyTypedInstance } from '@/types/types';
import { UserController } from '../controllers/user.controller';
import { createUserSchema } from './schemas/create.user.schema';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { profileUserSchema } from './schemas/profile.user.schema';

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);

  app.post('/users', { schema: createUserSchema }, (request, reply) =>
    userController.create(request, reply),
  );

  app.get(
    '/users/profile',
    { schema: profileUserSchema, preHandler: authMiddleware },
    request => {
      return request.user;
    },
  );
};
