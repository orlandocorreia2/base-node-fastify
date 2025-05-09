import { DBFindOneRepositoryProps } from '../../../../types/db';

export interface PermissionRuleRepositoryInterface {
  findMany<T>(): Promise<T[]>;
  findOne<T>(data: DBFindOneRepositoryProps): Promise<T>;
}
