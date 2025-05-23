import { inject, injectable } from 'tsyringe';
import { UpdateUserUseCaseProps, User } from '../DTOs/user';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { UpdateUserUseCaseInterface } from './interfaces/update.user.use.case.interface';
import { NotFoundError } from '../../../error/not.found.error';
import { generateExpiredAtDate } from '../../../utils/date';

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
    email,
    expiredAt,
    phone,
    address,
    permissionGroupsId,
  }: UpdateUserUseCaseProps): Promise<User> {
    const savedUser = await this._userRepository.findOne({ filter: { id } });
    if (!savedUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const expired_at = generateExpiredAtDate(expiredAt);
    const user = await this._userRepository.update({
      id,
      name,
      email,
      password: savedUser.password,
      expired_at,
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
