import { LogRepositoryProps } from '../types';

export interface LogRepositoryInterface {
  create<T>(data: LogRepositoryProps): Promise<T>;
}
