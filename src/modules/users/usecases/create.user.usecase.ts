import { inject, injectable } from 'tsyringe';
// import { randomBytes } from 'crypto';
import { CreateUserUseCaseProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UnprocessableError } from '../../../error/unprocessable';
import { CreateUserUseCaseInterface } from './interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('UserPermissionGroupRepository')
    private _userPermissionGroupRepository: UserPermissionGroupRepositoryInterface,
  ) {}

  public async execute({
    created_by_id,
    name,
    email,
    expiredAt,
    phone,
    address,
    permissionGroupsId,
  }: CreateUserUseCaseProps): Promise<User> {
    await this.verifyUserAlreadyRegistered(email);
    const password = await this.generatePassword(email);
    const user = await this._userRepository.create<User>({
      created_by_id,
      name,
      email,
      password,
      expired_at: new Date(expiredAt),
      phone,
      address,
    });

    if (permissionGroupsId && permissionGroupsId.length) {
      await this._userPermissionGroupRepository.createMany({
        userId: user.id,
        permissionGroupsId,
      });
    }
    return user;
  }

  private async verifyUserAlreadyRegistered(email: string) {
    const userAlreadyRegistered = await this._userRepository.findOne({
      filter: { email },
    });
    if (userAlreadyRegistered) {
      throw new UnprocessableError('User already registered!');
    }
  }

  private async generatePassword(email: string) {
    // const password = randomBytes(8).toString('base64url');
    const password = email.split('@')[0];
    console.log('Senha: ', password);
    return await generateHash(password);
  }
}
