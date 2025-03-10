import { injectable } from 'tsyringe';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { BaseRepositoryPrisma } from './base.repository.prisma';
import { prisma } from '../client';

@injectable()
export class PermissionGroupRuleRepositoryPrisma
  extends BaseRepositoryPrisma
  implements BaseRepositoryInterface
{
  constructor() {
    super();
    this._model = prisma.permissionGroupRule;
  }
}
