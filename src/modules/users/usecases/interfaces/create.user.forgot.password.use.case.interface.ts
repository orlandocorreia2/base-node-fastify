import { User } from '../../DTOs/user';

export interface CreateUserForgotPasswordUseCaseInterface {
  execute(email: string): Promise<User>;
}
