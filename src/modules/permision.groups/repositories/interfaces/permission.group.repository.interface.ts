import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import {
  CreatePermissionGroupRepositoryProps,
  UpdatePermissionGroupRepositoryProps,
} from '../types';

export interface PermissionGroupRepositoryInterface {
  create<T>(data: CreatePermissionGroupRepositoryProps): Promise<T>;
  paginate<T>(data: DBPaginateParametersProps): Promise<T>;
  findOne<T>(data: DBFindOneRepositoryProps): Promise<T>;
  update<T>(data: UpdatePermissionGroupRepositoryProps): Promise<T>;
  delete(id: string): Promise<void>;
}
