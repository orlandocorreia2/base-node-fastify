import { User } from '../../DTOs/user';
import { FindOneUserUseCaseExecuteProps } from '../types';

export interface FindOneUserUseCaseInterface {
  execute({ id, relationships }: FindOneUserUseCaseExecuteProps): Promise<User>;
}
