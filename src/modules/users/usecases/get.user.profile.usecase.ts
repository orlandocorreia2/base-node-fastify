import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { GetUserProfileUseCaseInterface } from './interfaces/get.user.profile.use.case.interface';

@injectable()
export class GetUserProfileUserUseCase
  implements GetUserProfileUseCaseInterface
{
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  async execute(authUserId: string): Promise<any> {
    return await this._userRepository.findOne({
      filter: { id: authUserId },
      relationships: { rules: true },
    });
  }
}
