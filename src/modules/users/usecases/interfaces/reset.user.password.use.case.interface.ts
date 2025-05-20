import { ResetUserPasswordUseCaseProps, User } from '../../DTOs/user';

export interface ResetUserPasswordUseCaseInterface {
  execute(data: ResetUserPasswordUseCaseProps): Promise<void>;
}
