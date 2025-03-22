import { inject, injectable } from 'tsyringe';
import { ResetUserPasswordUseCaseProps } from '../DTOs/user';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { TokenRepositoryInterface } from '../../../shared/interfaces/token.repository.interface';
import { ResetUserPasswordUseCaseInterface } from './interfaces/reset.user.password.use.case.interface';
import { app } from '../../../app';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { generateHash } from '../../../utils/hash';

@injectable()
export class ResetUserPasswordUseCase
  implements ResetUserPasswordUseCaseInterface
{
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('TokenRepository')
    private _tokenRepository: TokenRepositoryInterface,
  ) {}

  async execute({
    token,
    password,
  }: ResetUserPasswordUseCaseProps): Promise<void> {
    const tokenSaved = await this._tokenRepository.findOne(token);
    if (!tokenSaved || !tokenSaved.id) {
      throw new UnprocessableError('Token expirado');
    }
    try {
      app.jwt.verify(token);
      const { email } = app.jwt.decode(token) as { email: string };
      const { id, name, expired_at } = await this._userRepository.findOne({
        filter: { email },
      });
      const passwordHashed = await generateHash(password);
      await this._userRepository.update({
        id,
        name,
        password: passwordHashed,
        expired_at,
      });
    } catch (error) {
      throw new UnprocessableError('Token expirado');
    } finally {
      this._tokenRepository.delete(tokenSaved.id);
    }
  }
}
