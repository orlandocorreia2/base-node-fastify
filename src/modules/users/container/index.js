"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_repository_prisma_1 = require("@/infra/database/orms/prisma/repositories/user.repository.prisma");
const create_user_usecase_1 = require("@/modules/users/usecases/create.user.usecase");
const user_repository_1 = require("../repositories/user.repository");
tsyringe_1.container.registerSingleton("CreateUserUseCase", create_user_usecase_1.CreateUserUseCase);
tsyringe_1.container.registerSingleton("UserRepository", user_repository_1.UserRepository);
tsyringe_1.container.registerSingleton("UserRepositoryInfra", user_repository_prisma_1.UserRepositoryPrisma);
