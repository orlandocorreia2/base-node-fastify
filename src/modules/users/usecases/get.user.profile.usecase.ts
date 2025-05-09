import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { User } from '../DTOs/user';
import { NotFoundError } from '../../../error/not.found.error';
import { GetUserProfileUseCaseInterface } from './interfaces/get.user.profile.use.case.interface';

@injectable()
export class GetUserProfileUseCase implements GetUserProfileUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<User> {
    if (!id) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const user = await this._userRepository.findOne({
      filter: { id },
      relationships: { permissionGroups: true },
    });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    return user;
  }
}
