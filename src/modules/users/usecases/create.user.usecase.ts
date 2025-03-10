import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import { CreateUserUseCaseInterface } from '../interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../interfaces/user.repository..interface';
import { CreateUser, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UnprocessableError } from '../../../error/unprocessable';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute(createUser: CreateUser): Promise<User> {
    const userAlreadyRegistered = await this._userRepository.findOne({
      where: { email: createUser.email },
    });
    if (userAlreadyRegistered) {
      throw new UnprocessableError('User already registered!');
    }
    const token = randomBytes(8).toString('base64url');
    console.log('Password', token);
    const hashPassword = await generateHash(token);
    return await this._userRepository.create({
      data: { ...createUser, password: hashPassword },
    });
  }
}
