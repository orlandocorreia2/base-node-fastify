import { container } from 'tsyringe';
import { FastifyTypedInstance } from '@/types/types';
import { PermissionGroupController } from '../controllers/permission.group.controller';
import { createPermissionGroupSchema } from './schemas/create.permission.group.schema';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const permissionGroupRoutesModule = (app: FastifyTypedInstance) => {
  const permissionGroupController = container.resolve(
    PermissionGroupController,
  );

  app.post(
    '/permission-groups',
    { schema: createPermissionGroupSchema, preHandler: authMiddleware },
    (request, reply) => permissionGroupController.create(request, reply),
  );
};
