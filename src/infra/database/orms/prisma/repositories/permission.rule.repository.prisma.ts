import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { PermissionRuleRepositoryInterface } from 'modules/permision.groups/repositories/interfaces/permission.rule.repository.interface';
import { KeyValueProps } from 'types/types';

@injectable()
export class PermissionRuleRepositoryPrisma
  implements PermissionRuleRepositoryInterface
{
  constructor(private _model = prisma.permissionRule) {}

  async findOne<T>(filter: KeyValueProps): Promise<T> {
    return (await this._model.findFirst({ where: filter })) as T;
  }

  async findMany<T>(): Promise<T[]> {
    return (await this._model.findMany()) as T[];
  }
}
