import { inject, injectable } from 'tsyringe';
import { LogRepositoryInterface } from '../repositories/interfaces/log.repository.interface';
import { LogEntityProps } from 'shared/types/log';
import { CreateLogUseCaseInterface } from './interfaces/create.log.use.case.interface';
import { CreateLogUseCaseProps } from './types';
import { LogError } from 'error/log.error';

@injectable()
export class CreateLogUseCase implements CreateLogUseCaseInterface {
  constructor(
    @inject('LogRepository')
    private readonly _logRepository: LogRepositoryInterface,
  ) {}

  public async execute({
    type,
    log,
  }: CreateLogUseCaseProps): Promise<LogEntityProps> {
    this.validateData({ type, log });
    return await this._logRepository.create<LogEntityProps>({ type, log });
  }

  private validateData({ type, log }: CreateLogUseCaseProps) {
    if (!type) {
      throw new LogError('Log type is required.');
    }
    if (!log) {
      throw new LogError('Log data is required.');
    }
  }
}
