import { LogEntityProps } from 'shared/types/log';
import { CreateLogUseCaseProps } from '../types';

export interface CreateLogUseCaseInterface {
  execute(data: CreateLogUseCaseProps): Promise<LogEntityProps>;
}
