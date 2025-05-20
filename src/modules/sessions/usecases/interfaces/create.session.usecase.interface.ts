import { AuthUser, AuthToken } from '../../DTOs/session';

export interface CreateSessionUseCaseInterface {
  execute(authUser: AuthUser): Promise<AuthToken>;
}
