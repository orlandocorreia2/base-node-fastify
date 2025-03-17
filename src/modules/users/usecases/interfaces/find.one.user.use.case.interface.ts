import { User } from '../../DTOs/user';

export interface FindOneUserUseCaseInterface {
  execute(id?: string): Promise<User>;
}
