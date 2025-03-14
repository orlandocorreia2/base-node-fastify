import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { UserPermissionGroupRepositoryInterface } from '../../../../../modules/users/repositories/interfaces/user.permission.group.repository.interface';
import { CreateManyUserPermissionGroupsRepositoryProps } from 'modules/users/repositories/types';

@injectable()
export class UserPermissionGroupRepositoryPrisma
  implements UserPermissionGroupRepositoryInterface
{
  constructor(private _model = prisma.userPermissionGroup) {}

  async deleteMany(userId: string): Promise<void> {
    await this._model.deleteMany({ where: { user_id: userId } });
  }

  async createMany<T>({
    userId,
    permissionGroupsId,
  }: CreateManyUserPermissionGroupsRepositoryProps): Promise<T> {
    const data = permissionGroupsId.map(permissionGroupId => ({
      user_id: userId,
      permission_group_id: permissionGroupId,
    }));
    return (await this._model.createMany({ data })) as T;
  }
}
