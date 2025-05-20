import { PaginateUserProps, User } from '../../DTOs/user';
import { PaginateRequestProps } from '../../../../types/types';

export interface PaginateUsersUseCaseInterface {
  execute(data: PaginateRequestProps): Promise<PaginateUserProps<User>>;
}
