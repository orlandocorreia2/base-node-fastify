import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { UnauthorizedError } from '../error/unauthorized.error';
import { FindOneUserUseCase } from '../modules/users/usecases/find.one.user.usecase';
import { KeyValueProps } from '../types/types';

export const canMiddleware = async (
  request: FastifyRequest,
  _: FastifyReply,
) => {
  try {
    const permissionKeys: KeyValueProps = {
      'POST/users': 'createUser',
      'POST/users/batch': 'createUser',
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
      'POST/auction-properties/batch': 'createAuctionProperties',
      'GET/auction-properties': true,
    };
    const requestKey = `${request.routeOptions.method}${request.routeOptions.url}`;
    let hasPermission = permissionKeys[requestKey] === true;
    const findOneUserCase = container.resolve(FindOneUserUseCase);
    const requestUser = request.user as any;
    const user = await findOneUserCase.execute({
      id: requestUser.id,
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
