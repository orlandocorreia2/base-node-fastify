import { inject, injectable } from 'tsyringe';
import { UpdateUserProfileUseCaseProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { NotFoundError } from '../../../error/not.found.error';
import { UpdateUserProfileUseCaseInterface } from './interfaces/update.user.profile.use.case.interface';

@injectable()
export class UpdateUserProfileUseCase
  implements UpdateUserProfileUseCaseInterface
{
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute({
    id,
    name,
    password,
    phone,
    address,
  }: UpdateUserProfileUseCaseProps): Promise<User> {
    const authUser = await this._userRepository.findOne({ filter: { id } });
    if (!authUser) {
      throw new NotFoundError('Usuário não encontrado!');
    }
    const newPassword = password
      ? await generateHash(password)
      : authUser.password;
    return await this._userRepository.update({
      id,
      name,
      password: newPassword,
      expired_at: authUser.expired_at,
      phone,
      address,
    });
  }
}
