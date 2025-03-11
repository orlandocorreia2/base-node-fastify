import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import { CreateUserUseCaseInterface } from '../interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../interfaces/user.repository..interface';
import { CreateUserRequest, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UnprocessableError } from '../../../error/unprocessable';
import { UserPermissionGroupRepositoryInterface } from '../interfaces/user.permission.group.repository..interface';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('UserPermissionGroupRepository')
    private _userPermissionGroupRepositoryInterface: UserPermissionGroupRepositoryInterface,
  ) {}

  public async execute({
    name,
    email,
    expiredAt,
    phone,
    address,
    permissionGroupsId,
  }: CreateUserRequest): Promise<User> {
    await this.verifyUserAlreadyRegistered(email);
    const password = await this.generatePassword();
    const user = await this._userRepository.create<User>({
      data: {
        name,
        email,
        password,
        expiredAt: new Date(expiredAt),
        phone,
        address,
      },
    });
    this.setPermissionGroups({ userId: user.id, permissionGroupsId });
    return user;
  }

  private async verifyUserAlreadyRegistered(email: string) {
    const userAlreadyRegistered = await this._userRepository.findOne({
      where: { email },
    });
    if (userAlreadyRegistered) {
      throw new UnprocessableError('User already registered!');
    }
  }

  private async generatePassword() {
    const token = randomBytes(8).toString('base64url');
    console.log('Password', token);
    return await generateHash(token);
  }

  private async setPermissionGroups({
    userId,
    permissionGroupsId,
  }: {
    userId: string;
    permissionGroupsId?: string[];
  }) {
    if (!permissionGroupsId || !permissionGroupsId.length) return;
    const data = permissionGroupsId.map(permissionGroupId => ({
      user_id: userId,
      permission_group_id: permissionGroupId,
    }));
    await this._userPermissionGroupRepositoryInterface.createMany({ data });
    return { userId, permissionGroupsId };
  }
}
