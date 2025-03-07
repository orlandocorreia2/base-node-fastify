import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';
import { User } from './user';

export interface UserRepositoryInterface extends BaseRepositoryInterface {
  findOne(data: any): Promise<User>;
  create(data: any): Promise<User>;
}
