import { prisma } from "../client";
import { BaseRepositoryInterface } from "../../../../shared/repository/interfaces/base.repository.interface";
import { BaseRepositoryPrisma } from "./base.repository.prisma";
import { injectable } from "tsyringe";

@injectable()
export class UserRepositoryPrisma
  extends BaseRepositoryPrisma
  implements BaseRepositoryInterface
{
  constructor() {
    super();
    this._model = prisma.user;
  }
}
