import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { LogRepositoryInterface } from 'shared/repositories/interfaces/log.repository.interface';
import { LogRepositoryProps } from 'shared/repositories/types';

@injectable()
export class LogRepositoryPrisma implements LogRepositoryInterface {
  async create<T>(data: LogRepositoryProps): Promise<T> {
    return (await prisma.log.create({ data })) as T;
  }
}
