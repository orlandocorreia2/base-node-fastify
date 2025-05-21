import { inject, injectable } from 'tsyringe';
import { CreateUserAuctionPropertyFilterUseCaseInterface } from './interfaces/create.user.auction.property.filter.usecase.interface';
import { CreateUserAuctionPropertyFilterProps } from '../DTOs/user.auction.property.filter';
import { UserAuctionPropertyFilterRepositoryInterface } from '../repositories/interfaces/user.auction.property.filter.repository.interface';

@injectable()
export class CreateUserAuctionPropertyFilterUseCase
  implements CreateUserAuctionPropertyFilterUseCaseInterface
{
  constructor(
    @inject('UserAuctionPropertyFilterRepository')
    private readonly _userAuctionPropertyFilterRepository: UserAuctionPropertyFilterRepositoryInterface,
  ) {}

  public async execute({
    userId,
    name,
    filter,
  }: CreateUserAuctionPropertyFilterProps): Promise<void> {
    return await this._userAuctionPropertyFilterRepository.create({
      userId,
      name,
      filter,
    });
  }
}
