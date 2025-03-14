import { DBFindOneUserRepositoryProps } from '../../../../types/db';

export interface PermissionRuleRepositoryInterface {
  findMany<T>(): Promise<T[]>;
  findOne<T>(data: DBFindOneUserRepositoryProps): Promise<T>;
}
