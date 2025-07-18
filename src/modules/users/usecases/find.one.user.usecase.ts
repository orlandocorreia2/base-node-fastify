import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { FindOneUserUseCaseInterface } from './interfaces/find.one.user.use.case.interface';
import { User } from '../DTOs/user';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { NotFoundError } from '../../../error/not.found.error';
import { FindOneUserUseCaseExecuteProps } from './types';

@injectable()
export class FindOneUserUseCase implements FindOneUserUseCaseInterface {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    filter,
    relationships,
  }: FindOneUserUseCaseExecuteProps): Promise<User> {
    if (!filter || Object.keys(filter).length === 0) {
      throw new UnprocessableError(
        'É necessário informar um campo de filtro para buscar o usuário!',
      );
    }
    const user = await this._userRepository.findOne({
      filter,
      relationships,
    });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    return user;
  }
}
