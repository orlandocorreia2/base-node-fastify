import { PaginateUserProps, User } from '../../DTOs/user';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import { CreateUserRepositoryProps, UpdateUserRepositoryProps } from '../types';

export interface UserRepositoryInterface {
  create(data: CreateUserRepositoryProps): Promise<User>;
  paginate(data: DBPaginateParametersProps): Promise<PaginateUserProps<User>>;
  findOne(data: DBFindOneRepositoryProps): Promise<User>;
  update(data: UpdateUserRepositoryProps): Promise<User>;
  delete(id: string): Promise<void>;
}
