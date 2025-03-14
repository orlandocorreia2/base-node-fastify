import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { UserRepositoryInterface } from '../../../../../modules/users/repositories/interfaces/user.repository.interface';
import { DBPaginateParametersProps } from '../../../../../types/db';
import { positiveNumber } from 'utils/helper';
import { CreateUserRepositoryProps } from '../../../../../modules/users/repositories/types';
import { KeyValueProps } from 'types/types';

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  constructor(private _model = prisma.user) {}

  async findOne<T>(filter: KeyValueProps): Promise<T> {
    return (await this._model.findFirst({ where: filter })) as T;
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<T> {
    const total = await this._model.count({});
    page = positiveNumber(page);
    qtdItemsPerPage = positiveNumber(qtdItemsPerPage);
    const skip = (page - 1) * qtdItemsPerPage;
    const include: any = {};
    if (relationships?.permissionGroups) {
      include.permissionGroups = {
        include: { permissionGroup: { select: { id: true, name: true } } },
      };
    }
    const result = await this._model.findMany({
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
      include,
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async create<T>(data: CreateUserRepositoryProps): Promise<T> {
    return (await this._model.create({ data })) as T;
  }
}
