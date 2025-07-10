import { container } from 'tsyringe';
import { CreateLogUseCase } from '../../../shared/usecases/create.log.usecase';
import { CreateLogUseCaseInterface } from '../../../shared/usecases/interfaces/create.log.use.case.interface';
import { LogRepositoryInterface } from '../../../shared/repositories/interfaces/log.repository.interface';
import { LogRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/log.repository.prisma';

container.registerSingleton<CreateLogUseCaseInterface>(
  'CreateLogUseCase',
  CreateLogUseCase,
);

container.registerSingleton<LogRepositoryInterface>(
  'LogRepository',
  LogRepositoryPrisma,
);
