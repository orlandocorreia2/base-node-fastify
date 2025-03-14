import { container } from 'tsyringe';
import { UserRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.repository.prisma';
import { CreateUserUseCase } from '../../../modules/users/usecases/create.user.usecase';
import { CreateUserUseCaseInterface } from '../usecases/interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { UserPermissionGroupRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.permission.group.repository.prisma';
import { GetUserProfileUseCaseInterface } from '../usecases/interfaces/get.user.profile.use.case.interface';
import { GetUserProfileUserUseCase } from '../usecases/get.user.profile.usecase';
import { PaginateUsersUseCase } from '../usecases/paginate.users.usecase';
import { PaginateUsersUseCaseInterface } from '../usecases/interfaces/paginate.users.use.case.interface';

container.registerSingleton<CreateUserUseCaseInterface>(
  'CreateUserUseCase',
  CreateUserUseCase,
);

container.registerSingleton<PaginateUsersUseCaseInterface>(
  'PaginateUsersUseCase',
  PaginateUsersUseCase,
);

container.registerSingleton<GetUserProfileUseCaseInterface>(
  'GetUserProfileUseCase',
  GetUserProfileUserUseCase,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepositoryPrisma,
);

container.registerSingleton<UserPermissionGroupRepositoryInterface>(
  'UserPermissionGroupRepository',
  UserPermissionGroupRepositoryPrisma,
);
