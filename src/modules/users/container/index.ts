import { container } from 'tsyringe';
import { UserRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.repository.prisma';
import { CreateUserUseCase } from '../../../modules/users/usecases/create.user.usecase';
import { CreateUserUseCaseInterface } from '../usecases/interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { UserPermissionGroupRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.permission.group.repository.prisma';
import { PaginateUsersUseCase } from '../usecases/paginate.users.usecase';
import { PaginateUsersUseCaseInterface } from '../usecases/interfaces/paginate.users.use.case.interface';
import { FindOneUserUseCase } from '../usecases/find.one.user.usecase';
import { FindOneUserUseCaseInterface } from '../usecases/interfaces/find.one.user.use.case.interface';
import { UpdateUserUseCase } from '../usecases/update.user.usecase';
import { UpdateUserUseCaseInterface } from '../usecases/interfaces/update.user.use.case.interface';
import { DeleteUserUseCase } from '../usecases/delete.user.usecase';
import { DeleteUserUseCaseInterface } from '../usecases/interfaces/delete.user.use.case.interface';
import { CreateUsersBatchUseCase } from '../usecases/create.users.batch.usecase';
import { CreateUsersBatchUseCaseInterface } from '../usecases/interfaces/create.users.batch.use.case.interface';
import { GetUserProfileUseCaseInterface } from '../usecases/interfaces/get.user.profile.use.case.interface';
import { GetUserProfileUseCase } from '../usecases/get.user.profile.usecase';

container.registerSingleton<CreateUserUseCaseInterface>(
  'CreateUserUseCase',
  CreateUserUseCase,
);

container.registerSingleton<CreateUsersBatchUseCaseInterface>(
  'CreateUsersBatchUseCase',
  CreateUsersBatchUseCase,
);

container.registerSingleton<PaginateUsersUseCaseInterface>(
  'PaginateUsersUseCase',
  PaginateUsersUseCase,
);

container.registerSingleton<FindOneUserUseCaseInterface>(
  'FindOneUserUseCase',
  FindOneUserUseCase,
);

container.registerSingleton<UpdateUserUseCaseInterface>(
  'UpdateUserUseCase',
  UpdateUserUseCase,
);

container.registerSingleton<DeleteUserUseCaseInterface>(
  'DeleteUserUseCase',
  DeleteUserUseCase,
);

container.registerSingleton<GetUserProfileUseCaseInterface>(
  'GetUserProfileUseCase',
  GetUserProfileUseCase,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepositoryPrisma,
);

container.registerSingleton<UserPermissionGroupRepositoryInterface>(
  'UserPermissionGroupRepository',
  UserPermissionGroupRepositoryPrisma,
);
