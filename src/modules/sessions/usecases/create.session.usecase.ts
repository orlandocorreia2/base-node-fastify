import { inject, injectable } from 'tsyringe';
import { CreateSessionUseCaseInterface } from '../interfaces/create.session.usecase.interface';
import { AuthToken, AuthUser } from '../interfaces/session';
import { UserRepositoryInterface } from '@/modules/users/interfaces/user.repository..interface';
import { UnauthorizedError } from '@/error/unauthorized.error';
import { verifyHash } from '@/utils/hash';
import { app } from '@/app';
import { User } from '@/modules/users/interfaces/user';

@injectable()
export class CreateSessionUseCase implements CreateSessionUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute(authUser: AuthUser): Promise<AuthToken> {
    const { email, password } = authUser;
    const user = await this._userRepository.findOne<User>({ email });
    if (!user) {
      throw new UnauthorizedError();
    }
    const isPassword = await verifyHash(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedError();
    }
    const token = app.jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      { expiresIn: '1h' },
    );
    return { token };
  }
}
