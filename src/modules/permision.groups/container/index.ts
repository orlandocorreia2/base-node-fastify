import { container } from 'tsyringe';
import { PermissionGroupRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.group.repository.prisma';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { CreatePermissionGroupUseCase } from '../usecases/create.permission.group.usecase';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';
import { PermissionGroupRepositoryInterface } from '../interfaces/permission.group.repository.interface';
import { PermissionGroupRepository } from '../repositories/permission.group.repository';
import { FindAllPermissionRulesUseCaseInterface } from '../interfaces/find.all.permission.rules.use.case.interface';
import { FindAllPermissionRulesUseCase } from '../usecases/find.all.permission.rules.usecase';
import { PermissionRuleRepositoryInterface } from '../interfaces/permission.rule.repository.interface';
import { PermissionRuleRepository } from '../repositories/permission.rule.repository';
import { PermissionRuleRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.rule.repository.prisma';
import { PermissionGroupRuleRepositoryInterface } from '../interfaces/permission.group.rule.repository.interface';
import { PermissionGroupRuleRepository } from '../repositories/permission.group.rule.repository';
import { PermissionGroupRuleRepositoryPrisma } from '@/infra/database/orms/prisma/repositories/permission.group.rule.repository.prisma';

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
