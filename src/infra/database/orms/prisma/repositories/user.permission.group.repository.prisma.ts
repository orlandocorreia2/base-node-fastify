import { injectable } from 'tsyringe';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { BaseRepositoryPrisma } from './base.repository.prisma';
import { prisma } from '../client';

@injectable()
export class UserPermissionGroupRepositoryPrisma
  extends BaseRepositoryPrisma
  implements BaseRepositoryInterface
{
  constructor() {
    super();
    this._model = prisma.userPermissionGroup;
  }
}
