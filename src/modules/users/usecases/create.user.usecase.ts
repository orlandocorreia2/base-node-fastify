import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import { CreateUserUseCaseProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { CreateUserUseCaseInterface } from './interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { UserPermissionGroupRepositoryInterface } from '../repositories/interfaces/user.permission.group.repository.interface';
import { MailInterface } from '../../../shared/email/mail.interface';
import { app } from '../../../app';
import { TokenRepositoryInterface } from '../../../shared/interfaces/token.repository.interface';
import { env } from '../../../utils/env';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('UserPermissionGroupRepository')
    private _userPermissionGroupRepository: UserPermissionGroupRepositoryInterface,
    @inject('CreateUserMail')
    private _createUserMail: MailInterface,
    @inject('TokenRepository')
    private _tokenRepository: TokenRepositoryInterface,
  ) {}

  public async execute({
    createdById,
    name,
    email,
    expiredAt,
    phone,
    address,
    permissionGroupsId,
  }: CreateUserUseCaseProps): Promise<User> {
    await this.verifyUserAlreadyRegistered(email);
    const password = await this.generatePassword();
    const user = await this._userRepository.create({
      created_by_id: createdById,
      name,
      email,
      password,
      expired_at: new Date(expiredAt),
      phone,
      address,
    });
    this.attachPermissionGroups(permissionGroupsId, user.id);
    const link = await this.generateNewPasswordLink(user);
    this._createUserMail.send({ name, email, link });
    return user;
  }

  private async verifyUserAlreadyRegistered(email: string) {
    const userAlreadyRegistered = await this._userRepository.findOne({
      filter: { email },
      withDeleted: true,
    });
    if (userAlreadyRegistered) {
      throw new UnprocessableError('User already registered!');
    }
  }

  private async generatePassword() {
    const password = randomBytes(8).toString('base64url');
    return await generateHash(password);
  }

  private async attachPermissionGroups(
    permissionGroupsId: string[] | undefined,
    userId: string,
  ) {
    if (permissionGroupsId && permissionGroupsId.length) {
      await this._userPermissionGroupRepository.createMany({
        userId,
        permissionGroupsId,
      });
    }
  }

  private async generateNewPasswordLink(user: User) {
    const expiresIn = env({ key: 'TOKEN_EXPIRES_IN' });
    const jwt = app.jwt.sign(user, { expiresIn });
    const { token } = await this._tokenRepository.create(jwt);
    return `${env({ key: 'FRONT_URL' })}/reset-password/${token}`;
  }
}
