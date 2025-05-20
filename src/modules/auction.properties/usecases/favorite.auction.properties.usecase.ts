import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { FavoriteAuctionPropertiesUseCaseInterface } from './interfaces/favorite.auction.properties.usecase.interface';
import { AuctionPropertyUserFavoriteProps } from '../repositories/types';

@injectable()
export class FavoriteAuctionPropertiesUseCase
  implements FavoriteAuctionPropertiesUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private readonly _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute({
    auctionPropertyId,
    userId,
  }: AuctionPropertyUserFavoriteProps): Promise<void> {
    return await this._auctionPropertyRepository.favorite({
      auctionPropertyId,
      userId,
    });
  }
}
