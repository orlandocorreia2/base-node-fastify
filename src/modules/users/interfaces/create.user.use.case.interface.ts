import { CreateUser } from "./user";

export interface CreateUserUseCaseInterface {
  execute(createUser: CreateUser): Promise<any>;
}
