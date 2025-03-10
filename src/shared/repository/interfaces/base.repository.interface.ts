import { PaginateRequestProps } from '../../../types/types';

export interface BaseRepositoryInterface {
  findOne<T>(data: unknown): Promise<T>;
  create<T>(data: unknown): Promise<T>;
  createMany<T>(data: unknown): Promise<T[]>;
  findMany<T>(): Promise<T[]>;
  paginate<T>({ page, qtdItemsPerPage }: PaginateRequestProps): Promise<T>;
}
