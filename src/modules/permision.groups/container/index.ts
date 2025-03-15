import { container } from 'tsyringe';
import { PermissionGroupRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/permission.group.repository.prisma';
import { CreatePermissionGroupUseCase } from '../usecases/create.permission.group.usecase';
import { CreatePermissionGroupUseCaseInterface } from '../usecases/interfaces/create.permission.group.use.case.interface';
import { FindAllPermissionRulesUseCaseInterface } from '../usecases/interfaces/find.all.permission.rules.use.case.interface';
import { FindAllPermissionRulesUseCase } from '../usecases/find.all.permission.rules.usecase';
import { PermissionRuleRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/permission.rule.repository.prisma';
import { PaginatePermissionGroupsUseCase } from '../usecases/paginate.permission.groups.usecase';
import { PaginatePermissionGroupsUseCaseInterface } from '../usecases/interfaces/paginate.permission.groups.use.case.interface';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { PermissionRuleRepositoryInterface } from '../repositories/interfaces/permission.rule.repository.interface';
import { PermissionGroupRuleRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/permission.group.rule.repository.prisma';
import { PermissionGroupRuleRepositoryInterface } from '../repositories/interfaces/permission.group.rule.repository.interface';
import { FindOnePermissionGroupUseCase } from '../usecases/find.one.permission.group.usecase';
import { FindOnePermissionGroupUseCaseInterface } from '../usecases/interfaces/find.one.permission.group.use.case.interface';

container.registerSingleton<CreatePermissionGroupUseCaseInterface>(
  'CreatePermissionGroupUseCase',
  CreatePermissionGroupUseCase,
);

container.registerSingleton<PaginatePermissionGroupsUseCaseInterface>(
  'PaginatePermissionGroupsUseCase',
  PaginatePermissionGroupsUseCase,
);

container.registerSingleton<FindOnePermissionGroupUseCaseInterface>(
  'FindOnePermissionGroupUseCase',
  FindOnePermissionGroupUseCase,
);

container.registerSingleton<FindAllPermissionRulesUseCaseInterface>(
  'FindAllPermissionRulesUseCase',
  FindAllPermissionRulesUseCase,
);

container.registerSingleton<PermissionGroupRepositoryInterface>(
  'PermissionGroupRepository',
  PermissionGroupRepositoryPrisma,
);

container.registerSingleton<PermissionRuleRepositoryInterface>(
  'PermissionRuleRepository',
  PermissionRuleRepositoryPrisma,
);

container.registerSingleton<PermissionGroupRuleRepositoryInterface>(
  'PermissionGroupRuleRepository',
  PermissionGroupRuleRepositoryPrisma,
);
