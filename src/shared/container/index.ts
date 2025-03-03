import { container } from "tsyringe";
import { BaseRepositoryInterface } from "../repository/interfaces/base.repository.interface";
import { UserRepositoryPrisma } from "../../infra/database/prisma/repositories/user.repository.prisma";
import { CreateUserUseCaseInterface } from "../../modules/users/interfaces/create.user.use.case.interface";
import { UserRepositoryInterface } from "../../modules/users/interfaces/user.repository..interface";
import { CreateUserUseCase } from "../../modules/users/usecases/create.user.usecase";

container.registerSingleton<CreateUserUseCaseInterface>(
  "CreateUserUseCase",
  CreateUserUseCase
);

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepositoryPrisma
);

container.registerSingleton<BaseRepositoryInterface>(
  "UserRepositoryInfra",
  UserRepositoryPrisma
);
