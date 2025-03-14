import { KeyValueProps } from '../../../../types/types';

export interface PermissionRuleRepositoryInterface {
  findMany<T>(): Promise<T[]>;
  findOne<T>(filter: KeyValueProps): Promise<T>;
}
