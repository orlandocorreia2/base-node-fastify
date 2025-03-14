import { DBPaginateParametersProps } from '../../../../types/db';
import { CreatePermissionGroupRepositoryProps } from '../types';
import { KeyValueProps } from '../../../../types/types';

export interface PermissionGroupRepositoryInterface {
  create<T>(data: CreatePermissionGroupRepositoryProps): Promise<T>;
  paginate<T>(data: DBPaginateParametersProps): Promise<T>;
  findOne<T>(filter: KeyValueProps): Promise<T>;
}
