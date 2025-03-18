import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { UnauthorizedError } from '../error/unauthorized.error';
import { FindOneUserUseCase } from 'modules/users/usecases/find.one.user.usecase';
import { FastifyAuthRequest, KeyValueProps } from '../types/types';

export const canMiddleware = async (
  request: FastifyRequest,
  _: FastifyReply,
) => {
  try {
    let hasPermission = false;
    const permissionKeys: KeyValueProps = {
      'POST/users': 'createUser',
      'GET/users': 'listUsers',
      'GET/users/:id': 'editUser',
      'PATCH/users/:id': 'editUser',
      'DELETE/users/:id': 'deleteUser',
      'POST/permission-groups': 'createPermissionGroup',
      'GET/permission-groups': 'listPermissionGroups',
      'GET/permission-groups/:id': 'editPermissionGroup',
      'PATCH/permission-groups/:id': 'editPermissionGroup',
      'DELETE/permission-groups/:id': 'deletePermissionGroup',
      'GET/permission-rules': 'editPermissionGroup',
    };
    const requestKey = `${request.routeOptions.method}${request.routeOptions.url}`;
    const findOneUserCase = container.resolve(FindOneUserUseCase);
    const user = await findOneUserCase.execute({
      id: request.user.id,
      relationships: { rules: true },
    });
    user.permissionGroups?.forEach(permissionGroupItem => {
      permissionGroupItem.permissionGroup.rules?.forEach(ruleItem => {
        if (ruleItem.permissionRule.rule === permissionKeys[requestKey]) {
          hasPermission = true;
        }
      });
    });
    if (!hasPermission) {
      throw new UnauthorizedError(
        'Sem permissão para acessar este recurso. Verifique com o administrador!',
      );
    }
  } catch (error: any) {
    console.log(error);
    throw new UnauthorizedError(error.message);
  }
};
