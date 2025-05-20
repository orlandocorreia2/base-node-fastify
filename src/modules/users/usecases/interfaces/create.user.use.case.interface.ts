import { CreateUserUseCaseProps, User } from '../../DTOs/user';

export interface CreateUserUseCaseInterface {
  execute(data: CreateUserUseCaseProps): Promise<User>;
}
