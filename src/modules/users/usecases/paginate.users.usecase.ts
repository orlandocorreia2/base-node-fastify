import { inject, injectable } from 'tsyringe';
import { PaginateUsersUseCaseInterface } from './interfaces/paginate.users.use.case.interface';
import { PaginateRequestProps } from '../../../types/types';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { PaginateUserProps, User } from '../DTOs/user';

@injectable()
export class PaginateUsersUseCase implements PaginateUsersUseCaseInterface {
  constructor(
    @inject('UserRepository')
    private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute({
    page,
    qtdItemsPerPage,
    filter,
  }: PaginateRequestProps): Promise<PaginateUserProps<User>> {
    const result = await this._userRepository.paginate({
      page,
      qtdItemsPerPage,
      relationships: { permissionGroups: true },
      filter,
    });
    return result;
  }
}
