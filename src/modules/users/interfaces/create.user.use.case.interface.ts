import { CreateUser, User } from "./user";

export interface CreateUserUseCaseInterface {
  execute(createUser: CreateUser): Promise<User>;
}
