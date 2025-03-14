import { container } from 'tsyringe';
import { CreateSessionUseCaseInterface } from '../usecases/interfaces/create.session.usecase.interface';
import { CreateSessionUseCase } from '../usecases/create.session.usecase';

container.registerSingleton<CreateSessionUseCaseInterface>(
  'CreateSessionUseCase',
  CreateSessionUseCase,
);
