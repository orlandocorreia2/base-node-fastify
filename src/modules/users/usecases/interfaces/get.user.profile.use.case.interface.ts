import { User } from '../../DTOs/user';

export interface GetUserProfileUseCaseInterface {
  execute(id: string): Promise<User>;
}
