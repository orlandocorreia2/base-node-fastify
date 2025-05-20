import { UpdateUserUseCaseProps, User } from '../../DTOs/user';

export interface UpdateUserUseCaseInterface {
  execute(data: UpdateUserUseCaseProps): Promise<User>;
}
