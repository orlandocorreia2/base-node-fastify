import { CreateUserRequest, User } from '../DTOs/user';

export interface CreateUserUseCaseInterface {
  execute(createUser: CreateUserRequest): Promise<User>;
}
