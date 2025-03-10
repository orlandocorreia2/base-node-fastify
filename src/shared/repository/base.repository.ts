import { PaginateRequestProps } from '../../types/types';
import { BaseRepositoryInterface } from './interfaces/base.repository.interface';

export class BaseRepository implements BaseRepositoryInterface {
  protected _infraRepositoryInfra: BaseRepositoryInterface =
    {} as BaseRepositoryInterface;

  async create<T>(data: unknown): Promise<T> {
    return await this._infraRepositoryInfra.create({ data });
  }

  async createMany<T>(data: unknown): Promise<T[]> {
    return await this._infraRepositoryInfra.createMany({ data });
  }

  async findOne<T>(data: unknown): Promise<T> {
    return await this._infraRepositoryInfra.findOne(data);
  }

  async findMany<T>(): Promise<T[]> {
    return await this._infraRepositoryInfra.findMany<T>();
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
  }: PaginateRequestProps): Promise<T> {
    return await this._infraRepositoryInfra.paginate<T>({
      page,
      qtdItemsPerPage,
    });
  }
}
