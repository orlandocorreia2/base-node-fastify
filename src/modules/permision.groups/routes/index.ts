import { container } from 'tsyringe';
import { FastifyAuthRequest, FastifyTypedInstance } from '../../../types/types';
import { PermissionGroupController } from '../controllers/permission.group.controller';
import { createPermissionGroupSchema } from './schemas/create.permission.group.schema';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { canMiddleware } from '../../../middlewares/can.middleware';
import { PermissionRuleController } from '../controllers/permission.rule.controller';
import { findAllPermissionRulesSchema } from './schemas/find.all.permission.rule.schema';
import { paginatePermissionGroupSchema } from './schemas/paginate.permission.group.schema';
import { findOnePermissionGroupSchema } from './schemas/find.one.permission..group.schema';
import { updatePermissionGroupSchema } from './schemas/update.permission.group.schema';
import { deletePermissionGroupSchema } from './schemas/delete.permission.group.schema';

export const permissionGroupRoutesModule = (app: FastifyTypedInstance) => {
  const permissionGroupController = container.resolve(
    PermissionGroupController,
  );
  const permissionRuleController = container.resolve(PermissionRuleController);

  app.post(
    '/permission-groups',
    {
      schema: createPermissionGroupSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      permissionGroupController.create(request as FastifyAuthRequest, reply),
  );

  app.get(
    '/permission-groups',
    {
      schema: paginatePermissionGroupSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => permissionGroupController.findAll(request, reply),
  );

  app.get(
    '/permission-groups/:id',
    {
      schema: findOnePermissionGroupSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => permissionGroupController.findOne(request, reply),
  );

  app.patch(
    '/permission-groups/:id',
    {
      schema: updatePermissionGroupSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      permissionGroupController.update(request as FastifyAuthRequest, reply),
  );

  app.delete(
    '/permission-groups/:id',
    {
      schema: deletePermissionGroupSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) =>
      permissionGroupController.delete(request as FastifyAuthRequest, reply),
  );

  app.get(
    '/permission-rules',
    {
      schema: findAllPermissionRulesSchema,
      preHandler: [authMiddleware, canMiddleware],
    },
    (request, reply) => permissionRuleController.findAll(request, reply),
  );
};
