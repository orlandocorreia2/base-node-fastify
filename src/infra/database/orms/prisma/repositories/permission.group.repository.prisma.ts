import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { PermissionGroupRepositoryInterface } from 'modules/permision.groups/repositories/interfaces/permission.group.repository.interface';
import { DBPaginateParametersProps } from '../../../../../types/db';
import { positiveNumber } from '../../../../../utils/helper';
import { CreatePermissionGroupRepositoryProps } from '../../../../../modules/permision.groups/repositories/types';
import { KeyValueProps } from 'types/types';

@injectable()
export class PermissionGroupRepositoryPrisma
  implements PermissionGroupRepositoryInterface
{
  constructor(private _model = prisma.permissionGroup) {}

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
    if (relationships?.users) {
      include.users = {
        include: { user: { select: { id: true, name: true } } },
      };
    }
    if (relationships?.rules) {
      include.rules = {
        include: { permissionRule: { select: { id: true, rule: true } } },
      };
    }
    const result = await this._model.findMany({
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
      include,
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async create<T>({
    created_by_id,
    name,
    description,
  }: CreatePermissionGroupRepositoryProps): Promise<T> {
    return (await this._model.create({
      data: { created_by_id, name, description },
    })) as T;
  }
}
