import {
  DBCreateManyParameterProps,
  DBCreateParameterProps,
  DBDeleteParameterProps,
  DBFindFirstParameterProps,
  DBFindManyParametersProps,
  DBPaginateParametersProps,
  DBUpdateParameterProps,
} from '../../../types/db';

export interface BaseRepositoryInterface {
  findOne<T>({ where }: DBFindFirstParameterProps): Promise<T>;
  create<T>({ data }: DBCreateParameterProps): Promise<T>;
  createMany<T>({ data }: DBCreateManyParameterProps): Promise<T[]>;
  findMany<T>({ where }: DBFindManyParametersProps): Promise<T[]>;
  paginate<T>({ page, qtdItemsPerPage }: DBPaginateParametersProps): Promise<T>;
  update<T>({ data, where }: DBUpdateParameterProps): Promise<T>;
  delete({ where }: DBDeleteParameterProps): Promise<boolean>;
  deleteMany({ where }: DBDeleteParameterProps): Promise<boolean>;
}
