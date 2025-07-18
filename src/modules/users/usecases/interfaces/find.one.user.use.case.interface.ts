import { User } from '../../DTOs/user';
import { FindOneUserUseCaseExecuteProps } from '../types';

export interface FindOneUserUseCaseInterface {
  execute({
    filter,
    relationships,
  }: FindOneUserUseCaseExecuteProps): Promise<User>;
}
