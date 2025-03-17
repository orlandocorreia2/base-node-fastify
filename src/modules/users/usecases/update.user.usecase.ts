import { inject, injectable } from 'tsyringe';
import { UpdateUserUseCaseProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { UpdateUserUseCaseInterface } from './interfaces/update.user.use.case.interface';
import { NotFoundError } from '../../../error/not.found.error';

@injectable()
export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('UserPermissionGroupRepository')
    private _userPermissionGroupRepository: UserPermissionGroupRepositoryInterface,
  ) {}

  public async execute({
    id,
    name,
    password,
    expiredAt,
    phone,
    address,
    permissionGroupsId,
  }: UpdateUserUseCaseProps): Promise<User> {
    if (!id) {
      throw new UnprocessableError('O id do usuário é obrigatório!');
    }
    const savedUser = await this._userRepository.findOne({ filter: { id } });
    if (!savedUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const newPassword = password
      ? await generateHash(password)
      : savedUser.password;
    const user = await this._userRepository.update({
      id,
      name,
      password: newPassword,
      expired_at: new Date(expiredAt),
      phone,
      address,
    });
    await this._userPermissionGroupRepository.deleteMany(id);
    if (permissionGroupsId && permissionGroupsId.length) {
      await this._userPermissionGroupRepository.createMany({
        userId: user.id,
        permissionGroupsId,
      });
    }
    return await this._userRepository.findOne({
      filter: { id },
      relationships: { permissionGroups: true },
    });
  }
}
