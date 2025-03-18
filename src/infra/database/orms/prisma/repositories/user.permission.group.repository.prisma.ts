import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { UserPermissionGroupRepositoryInterface } from '../../../../../modules/users/repositories/interfaces/user.permission.group.repository.interface';
import { CreateManyUserPermissionGroupsRepositoryProps } from '../../../../../modules/users/repositories/types';

@injectable()
export class UserPermissionGroupRepositoryPrisma
  implements UserPermissionGroupRepositoryInterface
{
  async deleteMany(userId: string): Promise<void> {
    await prisma.userPermissionGroup.deleteMany({ where: { user_id: userId } });
  }

  async createMany<T>({
    userId,
    permissionGroupsId,
  }: CreateManyUserPermissionGroupsRepositoryProps): Promise<T> {
    const data: { user_id: string; permission_group_id: string }[] = [];
    for (let permissionGroupId of permissionGroupsId) {
      const hasPermissionGroup = await prisma.permissionGroup.findFirst({
        where: { id: permissionGroupId },
      });
      if (hasPermissionGroup) {
        data.push({
          user_id: userId,
          permission_group_id: permissionGroupId,
        });
      }
    }
    return (await prisma.userPermissionGroup.createMany({ data })) as T;
  }
}
