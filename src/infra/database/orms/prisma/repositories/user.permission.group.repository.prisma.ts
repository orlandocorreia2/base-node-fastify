import { injectable } from 'tsyringe';

import { BaseRepositoryPrisma } from './base.repository.prisma';
import { prisma } from '../client';
import { BaseRepositoryInterface } from '../../../../../shared/repository/interfaces/base.repository.interface';

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
