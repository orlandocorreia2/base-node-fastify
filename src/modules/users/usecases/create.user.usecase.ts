import { injectable } from "tsyringe";
import { CreateUserUseCaseInterface } from "../interfaces/create.user.use.case.interface";

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  // constructor(
  //   @inject("UserRepository") private _repository: UserRepositoryInterface
  // ) {}

  async execute() {
    return { service: true };
    // return this._repository.create({ data });
  }
}
