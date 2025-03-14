import {
  DBFindOneUserRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import { CreateUserRepositoryProps } from '../types';

export interface UserRepositoryInterface {
  create<T>(data: CreateUserRepositoryProps): Promise<T>;
  paginate<T>({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<T>;
  findOne<T>(data: DBFindOneUserRepositoryProps): Promise<T>;
}
