import { inject, injectable } from 'tsyringe';
import { CreateUserUseCaseInterface } from '../interfaces/create.user.use.case.interface';
import { UserRepositoryInterface } from '../interfaces/user.repository..interface';
import { CreateUser } from '../interfaces/user';
import { generateHash } from '@/utils/hash';
import { randomBytes } from 'crypto';
import { UnprocessableError } from '@/error/unprocessable';
import { User } from '@prisma/client';

@injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute(createUser: CreateUser): Promise<User> {
    const userAlreadyRegistered = await this._userRepository.findOne({
      email: createUser.email,
    });
    if (userAlreadyRegistered) {
      throw new UnprocessableError('User already registered!');
    }
    const token = randomBytes(8).toString('base64url');
    console.log('Password', token);
    const hashPassword = await generateHash(token);
    return await this._userRepository.create({
      ...createUser,
      password: hashPassword,
    });
  }
}
