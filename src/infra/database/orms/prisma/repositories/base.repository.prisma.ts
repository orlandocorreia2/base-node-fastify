import { PaginateRequestProps } from 'types/types';
import { BaseRepositoryInterface } from '../../../../../shared/repository/interfaces/base.repository.interface';
import { ModelInterface } from '../interfaces/model.create.interface.prisma';
import { positiveNumber } from '../../../../../utils/helper';

export class BaseRepositoryPrisma implements BaseRepositoryInterface {
  protected _model: ModelInterface = {} as ModelInterface;

  async create<T>({ data }: { data: unknown }): Promise<T> {
    return (await this._model.create({
      data,
    })) as T;
  }

  async createMany<T>({ data }: { data: unknown }): Promise<T[]> {
    return (await this._model.createMany({
      data,
    })) as T[];
  }

  async findOne<T>(data: unknown): Promise<T> {
    return (await this._model.findFirst({ where: data })) as T;
  }

  async findMany<T>(): Promise<T[]> {
    return (await this._model.findMany({})) as T[];
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
  }: PaginateRequestProps): Promise<T> {
    const total = await this._model.count();
    page = positiveNumber(page);
    qtdItemsPerPage = positiveNumber(qtdItemsPerPage);
    const skip = (page - 1) * qtdItemsPerPage;

    const dataResult = await this._model.findMany({
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
    });
    return { items: dataResult, page, qtdItemsPerPage, total } as T;
  }
}
