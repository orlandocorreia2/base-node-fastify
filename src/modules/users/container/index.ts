import { container } from 'tsyringe';
import { UserRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.repository.prisma';
import { CreateUserUseCaseInterface } from '../../../modules/users/interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../../../modules/users/interfaces/user.repository..interface';
import { CreateUserUseCase } from '../../../modules/users/usecases/create.user.usecase';
import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';
import { UserRepository } from '../repositories/user.repository';

container.registerSingleton<CreateUserUseCaseInterface>(
  'CreateUserUseCase',
  CreateUserUseCase,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<BaseRepositoryInterface>(
  'UserRepositoryInfra',
  UserRepositoryPrisma,
);
