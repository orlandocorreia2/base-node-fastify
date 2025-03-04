import { inject, injectable } from "tsyringe";
import { CreateUserUseCaseInterface } from "../interfaces/create.user.use.case.interface";
import { UserRepositoryInterface } from "../interfaces/user.repository..interface";
import { CreateUser } from "../interfaces/user";

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject("UserRepository") private _userRepository: UserRepositoryInterface
  ) {}

  public async execute(createUser: CreateUser) {
    return await this._userRepository.create(createUser);
  }
}
