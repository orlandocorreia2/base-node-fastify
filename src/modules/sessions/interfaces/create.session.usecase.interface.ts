import { AuthUser, AuthToken } from "./session";

export interface CreateSessionUseCaseInterface {
  execute(authUser: AuthUser): Promise<AuthToken>;
}
