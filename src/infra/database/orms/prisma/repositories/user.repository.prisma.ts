import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { UserRepositoryInterface } from '../../../../../modules/users/repositories/interfaces/user.repository.interface';
import {
  DBFindOneUserRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../../types/db';
import { positiveNumber } from '../../../../../utils/helper';
import {
  CreateUserRepositoryProps,
  UpdateUserRepositoryProps,
} from '../../../../../modules/users/repositories/types';
import { KeyValueProps } from '../../../../../types/types';

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  async findOne<T>({
    filter,
    relationships,
    withDeleted,
  }: DBFindOneUserRepositoryProps): Promise<T> {
    const where = { ...filter };
    if (!withDeleted) where.deleted_at = null;
    const include: any = {};
    if (relationships?.rules) {
      include.permissionGroups = {
        include: {
          permissionGroup: {
            include: {
              rules: {
                include: {
                  permissionRule: { select: { id: true, rule: true } },
                },
              },
            },
          },
        },
      };
    }
    if (relationships?.permissionGroups) {
      include.permissionGroups = {
        include: { permissionGroup: { select: { id: true, name: true } } },
      };
    }
    return (await prisma.user.findFirst({ where, include })) as T;
  }

  async paginate<T>({
    filter,
    page,
    qtdItemsPerPage,
    relationships,
    withDeleted,
  }: DBPaginateParametersProps): Promise<T> {
    const where: KeyValueProps = filter
      ? {
          OR: [
            { name: { contains: filter, mode: 'insensitive' } },
            { email: { contains: filter, mode: 'insensitive' } },
            { phone: { contains: filter, mode: 'insensitive' } },
            { address: { contains: filter, mode: 'insensitive' } },
          ],
        }
      : {};
    if (!withDeleted) where.deleted_at = null;
    const total = await prisma.user.count({ where });
    page = positiveNumber(page);
    qtdItemsPerPage = positiveNumber(qtdItemsPerPage);
    const skip = (page - 1) * qtdItemsPerPage;
    const include: any = {};
    if (relationships?.permissionGroups) {
      include.permissionGroups = {
        include: { permissionGroup: { select: { id: true, name: true } } },
      };
    }
    const result = await prisma.user.findMany({
      where,
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
      include,
      orderBy: { created_at: 'desc' },
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async create<T>(data: CreateUserRepositoryProps): Promise<T> {
    return (await prisma.user.create({ data })) as T;
  }

  async update<T>(data: UpdateUserRepositoryProps): Promise<T> {
    return (await prisma.user.update({ where: { id: data.id }, data })) as T;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
