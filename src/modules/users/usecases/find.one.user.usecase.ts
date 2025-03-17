import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { FindOneUserUseCaseInterface } from './interfaces/find.one.user.use.case.interface';
import { User } from '../DTOs/user';
import { UnprocessableError } from '../../../error/unprocessable.error';

@injectable()
export class FindOneUserUseCase implements FindOneUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  async execute(id?: string): Promise<User> {
    if (!id) {
      throw new UnprocessableError('O id do usuário é obrigatório!');
    }
    return await this._userRepository.findOne({
      filter: { id },
      relationships: { permissionGroups: true },
    });
  }
}
