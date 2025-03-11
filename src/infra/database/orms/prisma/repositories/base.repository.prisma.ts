import { BaseRepositoryInterface } from '../../../../../shared/repository/interfaces/base.repository.interface';
import { ModelInterface } from '../interfaces/model.create.interface.prisma';
import { positiveNumber } from '../../../../../utils/helper';
import {
  DBCreateManyParameterProps,
  DBCreateParameterProps,
  DBDeleteParameterProps,
  DBFindFirstParameterProps,
  DBFindManyParametersProps,
  DBPaginateParametersProps,
  DBUpdateParameterProps,
} from '../../../../../types/db';

export class BaseRepositoryPrisma implements BaseRepositoryInterface {
  protected _model: ModelInterface = {} as ModelInterface;

  async create<T>({ data }: DBCreateParameterProps): Promise<T> {
    return (await this._model.create({
      data,
    })) as T;
  }

  async createMany<T>({ data }: DBCreateManyParameterProps): Promise<T[]> {
    return (await this._model.createMany({
      data,
    })) as T[];
  }

  async findOne<T>({ where }: DBFindFirstParameterProps): Promise<T> {
    return (await this._model.findFirst({ where })) as T;
  }

  async findMany<T>({ where }: DBFindManyParametersProps): Promise<T[]> {
    return (await this._model.findMany({ where })) as T[];
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
  }: DBPaginateParametersProps): Promise<T> {
    const total = await this._model.count({});
    page = positiveNumber(page);
    qtdItemsPerPage = positiveNumber(qtdItemsPerPage);
    const skip = (page - 1) * qtdItemsPerPage;

    const dataResult = await this._model.findMany({
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
    });
    return { items: dataResult, page, qtdItemsPerPage, total } as T;
  }

  async update<T>({ data, where }: DBUpdateParameterProps): Promise<T> {
    return (await this._model.update({
      data,
      where,
    })) as T;
  }

  async delete({ where }: DBDeleteParameterProps): Promise<boolean> {
    await this._model.delete({ where });
    return true;
  }

  async deleteMany({ where }: DBDeleteParameterProps): Promise<boolean> {
    await this._model.deleteMany({ where });
    return true;
  }
}
