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
import { generateExpiredAtDate } from '../../../utils/date';

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
    const user = await this.createOrUpdateUser({
      createdById,
      name,
      email,
      expiredAt,
      phone,
      address,
    });
    this.attachPermissionGroups(permissionGroupsId, user.id);
    const link = await this.generatePasswordLink(user);
    this._createUserMail.send({ name, email, link });
    return user;
  }

  private async createOrUpdateUser({
    createdById,
    name,
    email,
    expiredAt,
    phone,
    address,
  }: CreateUserUseCaseProps): Promise<User> {
    const userAlreadyRegistered = await this._userRepository.findOne({
      filter: { email },
      withDeleted: true,
    });
    if (userAlreadyRegistered && !userAlreadyRegistered.deleted_at) {
      throw new UnprocessableError('Usuário já está cadastrado na plataforma.');
    }
    const expired_at = generateExpiredAtDate(expiredAt);
    if (userAlreadyRegistered) {
      return await this._userRepository.update({
        id: userAlreadyRegistered.id,
        name,
        email,
        expired_at,
        phone,
        address,
        deleted_at: null,
      });
    }
    const password = await this.generatePassword();
    return await this._userRepository.create({
      created_by_id: createdById,
      name,
      email,
      password,
      expired_at,
      phone,
      address,
    });
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

  private async generatePasswordLink(user: User) {
    const jwt = app.jwt.sign(user, { expiresIn: '24h' });
    const { token } = await this._tokenRepository.create(jwt);
    return `${env({ key: 'FRONT_URL' })}/reset-password/${token}`;
  }
}
