import { container } from 'tsyringe';
import { PermissionGroupRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.group.repository.prisma';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { CreatePermissionGroupUseCase } from '../usecases/create.permission.group.usecase';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';
import { PermissionGroupRepositoryInterface } from '../interfaces/permission.group.repository.interface';
import { PermissionGroupRepository } from '../repositories/permission.group.repository';

container.registerSingleton<CreatePermissionGroupUseCaseInterface>(
  'CreatePermissionGroupUseCase',
  CreatePermissionGroupUseCase,
);

container.registerSingleton<PermissionGroupRepositoryInterface>(
  'PermissionGroupRepository',
  PermissionGroupRepository,
);

container.registerSingleton<BaseRepositoryInterface>(
  'PermissionGroupRepositoryInfra',
  PermissionGroupRepositoryPrisma,
);
