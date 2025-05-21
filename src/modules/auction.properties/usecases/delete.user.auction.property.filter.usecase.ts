import { inject, injectable } from 'tsyringe';
import { UserAuctionPropertyFilterRepositoryInterface } from '../repositories/interfaces/user.auction.property.filter.repository.interface';
import { DeleteUserAuctionPropertyFilterUseCaseInterface } from './interfaces/delete.user.auction.property.filter.usecase.interface';

@injectable()
export class DeleteUserAuctionPropertyFilterUseCase
  implements DeleteUserAuctionPropertyFilterUseCaseInterface
{
  constructor(
    @inject('UserAuctionPropertyFilterRepository')
    private readonly _userAuctionPropertyFilterRepository: UserAuctionPropertyFilterRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<void> {
    const userAuctionPropertyFilter =
      await this._userAuctionPropertyFilterRepository.findOne(id);
    if (userAuctionPropertyFilter)
      await this._userAuctionPropertyFilterRepository.delete(id);
  }
}
