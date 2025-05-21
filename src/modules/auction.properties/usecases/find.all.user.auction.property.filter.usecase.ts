import { inject, injectable } from 'tsyringe';
import { UserAuctionPropertyFilterProps } from '../DTOs/user.auction.property.filter';
import { UserAuctionPropertyFilterRepositoryInterface } from '../repositories/interfaces/user.auction.property.filter.repository.interface';
import { FindAllUserAuctionPropertyFilterUseCaseInterface } from './interfaces/find.all.user.auction.property.filter.usecase.interface';

@injectable()
export class FindAllUserAuctionPropertyFilterUseCase
  implements FindAllUserAuctionPropertyFilterUseCaseInterface
{
  constructor(
    @inject('UserAuctionPropertyFilterRepository')
    private readonly _userAuctionPropertyFilterRepository: UserAuctionPropertyFilterRepositoryInterface,
  ) {}

  public async execute(
    userId: string,
  ): Promise<UserAuctionPropertyFilterProps[]> {
    return await this._userAuctionPropertyFilterRepository.findMany(userId);
  }
}
