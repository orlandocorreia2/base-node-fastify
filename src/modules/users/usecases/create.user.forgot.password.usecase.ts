import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { MailInterface } from '../../../shared/email/mail.interface';
import { app } from '../../../app';
import { TokenRepositoryInterface } from '../../../shared/interfaces/token.repository.interface';
import { env } from '../../../utils/env';
import { CreateUserForgotPasswordUseCaseInterface } from './interfaces/create.user.forgot.password.use.case.interface';
import { NotFoundError } from '../../../error/not.found.error';
import { User } from '../DTOs/user';

@injectable()
export class CreateUserForgotPasswordUseCase
  implements CreateUserForgotPasswordUseCaseInterface
{
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('CreateUserForgotPasswordMail')
    private _createUserForgotPasswordMail: MailInterface,
    @inject('TokenRepository')
    private _tokenRepository: TokenRepositoryInterface,
  ) {}

  public async execute(email: string): Promise<User> {
    const user = await this._userRepository.findOne({ filter: { email } });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    const link = await this.generatePasswordLink(user);
    this._createUserForgotPasswordMail.send({ name: user.name, email, link });
    return user;
  }

  private async generatePasswordLink(user: User) {
    const expiresIn = env({ key: 'TOKEN_EXPIRES_IN' });
    const jwt = app.jwt.sign(user, { expiresIn });
    const { token } = await this._tokenRepository.create(jwt);
    return `${env({ key: 'FRONT_URL' })}/reset-password/${token}`;
  }
}
