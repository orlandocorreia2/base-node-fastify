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

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  async findOne<T>({
    filter,
    relationships,
  }: DBFindOneUserRepositoryProps): Promise<T> {
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
    return (await prisma.user.findFirst({
      where: filter,
      include,
    })) as T;
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<T> {
    const total = await prisma.user.count({});
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
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
      include,
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async create<T>(data: CreateUserRepositoryProps): Promise<T> {
    return (await prisma.user.create({ data })) as T;
  }

  async update<T>(data: UpdateUserRepositoryProps): Promise<T> {
    return (await prisma.user.update({ where: { id: data.id }, data })) as T;
  }
}
