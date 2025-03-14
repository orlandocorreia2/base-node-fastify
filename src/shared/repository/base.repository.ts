import {
  DBCreateManyParameterProps,
  DBCreateParameterProps,
  DBDeleteParameterProps,
  DBFindFirstParameterProps,
  DBFindManyParametersProps,
  DBPaginateParametersProps,
  DBUpdateParameterProps,
} from 'types/db';
import { BaseRepositoryInterface } from './interfaces/base.repository.interface';

export class BaseRepository implements BaseRepositoryInterface {
  protected _infraRepositoryInfra: BaseRepositoryInterface =
    {} as BaseRepositoryInterface;

  async create<T>({ data }: DBCreateParameterProps): Promise<T> {
    return await this._infraRepositoryInfra.create({ data });
  }

  async createMany<T>({ data }: DBCreateManyParameterProps): Promise<T[]> {
    return await this._infraRepositoryInfra.createMany({ data });
  }

  async findOne<T>({ where }: DBFindFirstParameterProps): Promise<T> {
    return await this._infraRepositoryInfra.findOne({ where });
  }

  async findMany<T>({
    where,
    include,
  }: DBFindManyParametersProps): Promise<T[]> {
    return await this._infraRepositoryInfra.findMany<T>({ where, include });
  }

  async paginate<T>({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<T> {
    return await this._infraRepositoryInfra.paginate<T>({
      page,
      qtdItemsPerPage,
      relationships,
    });
  }

  async update<T>({ data, where }: DBUpdateParameterProps): Promise<T> {
    return await this._infraRepositoryInfra.update({ data, where });
  }

  async delete({ where }: DBDeleteParameterProps): Promise<boolean> {
    return await this._infraRepositoryInfra.delete({ where });
  }

  async deleteMany({ where }: DBDeleteParameterProps): Promise<boolean> {
    return await this._infraRepositoryInfra.deleteMany({ where });
  }
}
