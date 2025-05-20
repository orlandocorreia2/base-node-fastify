import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { DeleteUserUseCaseInterface } from './interfaces/delete.user.use.case.interface';
import { NotFoundError } from '../../../error/not.found.error';

@injectable()
export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('UserPermissionGroupRepository')
    private _userPermissionGroupRepository: UserPermissionGroupRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void> {
    const savedUser = await this._userRepository.findOne({ filter: { id } });
    if (!savedUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    await this._userPermissionGroupRepository.deleteMany(id);
    await this._userRepository.delete(id);
  }
}
