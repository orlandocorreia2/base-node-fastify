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
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  async execute({
    id,
    relationships,
  }: FindOneUserUseCaseExecuteProps): Promise<User> {
    if (!id) {
      throw new UnprocessableError('O id do usuário é obrigatório!');
    }
    const user = await this._userRepository.findOne({
      filter: { id },
      relationships,
    });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    return user;
  }
}
