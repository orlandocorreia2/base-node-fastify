import { CreateUser } from 'modules/users/DTOs/user';
import { DBPaginateParametersProps } from 'types/db';
import { CreateUserRepositoryProps } from '../types';
import { KeyValueProps } from '../../../../types/types';

export interface UserRepositoryInterface {
  create<T>(data: CreateUserRepositoryProps): Promise<T>;
  paginate<T>({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<T>;
  findOne<T>(filter: KeyValueProps): Promise<T>;
}
