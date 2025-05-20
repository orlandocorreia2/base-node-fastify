import { UpdateUserProfileUseCaseProps, User } from '../../DTOs/user';

export interface UpdateUserProfileUseCaseInterface {
  execute(data: UpdateUserProfileUseCaseProps): Promise<User>;
}
