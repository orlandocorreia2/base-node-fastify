import { container } from 'tsyringe';
import { FastifyTypedInstance } from '@/types/types';
import { PermissionGroupController } from '../controllers/permission.group.controller';
import { createPermissionGroupSchema } from './schemas/create.permission.group.schema';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { PermissionRuleController } from '../controllers/permission.rule.controller';
import { findAllPermissionRulesSchema } from './schemas/find.all.permission.rule.schema';
import { paginatePermissionGroupSchema } from './schemas/paginate.permission.group.schema';

export const permissionGroupRoutesModule = (app: FastifyTypedInstance) => {
  const permissionGroupController = container.resolve(
    PermissionGroupController,
  );
  const permissionRuleController = container.resolve(PermissionRuleController);

  app.post(
    '/permission-groups',
    { schema: createPermissionGroupSchema, preHandler: authMiddleware },
    (request, reply) => permissionGroupController.create(request, reply),
  );

  app.get(
    '/permission-groups',
    { schema: paginatePermissionGroupSchema, preHandler: authMiddleware },
    (request, reply) => permissionGroupController.findAll(request, reply),
  );

  app.get(
    '/permission-rules',
    { schema: findAllPermissionRulesSchema, preHandler: authMiddleware },
    (request, reply) => permissionRuleController.findAll(request, reply),
  );
};
