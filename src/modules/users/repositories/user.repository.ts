import { inject, injectable } from "tsyringe";
import { BaseRepository } from "../../../shared/repository/base.repository";
import { BaseRepositoryInterface } from "../../../shared/repository/interfaces/base.repository.interface";

@injectable()
export class UserRepository extends BaseRepository {
  constructor(
    @inject("UserRepositoryInfra") userRepositoryInfra: BaseRepositoryInterface
  ) {
    super();
    this._infraRepositoryInfra = userRepositoryInfra;
  }
}
