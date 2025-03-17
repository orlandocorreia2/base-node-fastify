import { PaginateUserProps, User } from '../../DTOs/user';
import {
  DBFindOneUserRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import { CreateUserRepositoryProps, UpdateUserRepositoryProps } from '../types';

export interface UserRepositoryInterface {
  create(data: CreateUserRepositoryProps): Promise<User>;
  paginate({
    page,
    qtdItemsPerPage,
    relationships,
  }: DBPaginateParametersProps): Promise<PaginateUserProps<User>>;
  findOne(data: DBFindOneUserRepositoryProps): Promise<User>;
  update(data: UpdateUserRepositoryProps): Promise<User>;
}
