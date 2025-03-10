import { CreateUser, User } from '../DTOs/user';

export interface CreateUserUseCaseInterface {
  execute(createUser: CreateUser): Promise<User>;
}
