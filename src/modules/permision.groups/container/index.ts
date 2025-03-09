import { container } from 'tsyringe';
import { PermissionGroupRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.group.repository.prisma';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { CreatePermissionGroupUseCase } from '../usecases/create.permission.group.usecase';
import { CreatePermissionGroupUseCaseInterface } from '../usecases/interfaces/create.permission.group.use.case.interface';
import { PermissionGroupRepository } from '../repositories/permission.group.repository';
import { FindAllPermissionRulesUseCaseInterface } from '../usecases/interfaces/find.all.permission.rules.use.case.interface';
import { FindAllPermissionRulesUseCase } from '../usecases/find.all.permission.rules.usecase';
import { PermissionRuleRepositoryInterface } from '../repositories/interfaces/permission.rule.repository.interface';
import { PermissionRuleRepository } from '../repositories/permission.rule.repository';
import { PermissionRuleRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.rule.repository.prisma';
import { PermissionGroupRuleRepository } from '../repositories/permission.group.rule.repository';
import { PermissionGroupRuleRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.group.rule.repository.prisma';
import { PaginatePermissionGroupsUseCase } from '../usecases/paginate.permission.groups.usecase';
import { PaginatePermissionGroupsUseCaseInterface } from '../usecases/interfaces/paginate.permission.groups.use.case.interface';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { PermissionGroupRuleRepositoryInterface } from '../repositories/interfaces/permission.group.rule.repository.interface';

container.registerSingleton<CreatePermissionGroupUseCaseInterface>(
  'CreatePermissionGroupUseCase',
  CreatePermissionGroupUseCase,
);

container.registerSingleton<PaginatePermissionGroupsUseCaseInterface>(
  'PaginatePermissionGroupsUseCase',
  PaginatePermissionGroupsUseCase,
);

container.registerSingleton<PermissionGroupRepositoryInterface>(
  'PermissionGroupRepository',
  PermissionGroupRepository,
);

container.registerSingleton<BaseRepositoryInterface>(
  'PermissionGroupRepositoryInfra',
  PermissionGroupRepositoryPrisma,
);

container.registerSingleton<FindAllPermissionRulesUseCaseInterface>(
  'FindAllPermissionRulesUseCase',
  FindAllPermissionRulesUseCase,
);

container.registerSingleton<PermissionRuleRepositoryInterface>(
  'PermissionRuleRepository',
  PermissionRuleRepository,
);

container.registerSingleton<BaseRepositoryInterface>(
  'PermissionRuleRepositoryInfra',
  PermissionRuleRepositoryPrisma,
);

container.registerSingleton<PermissionGroupRuleRepositoryInterface>(
  'PermissionGroupRuleRepository',
  PermissionGroupRuleRepository,
);

container.registerSingleton<BaseRepositoryInterface>(
  'PermissionGroupRuleRepositoryInfra',
  PermissionGroupRuleRepositoryPrisma,
);
