import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyUserFavoriteProps } from '../repositories/types';
import { UnFavoriteAuctionPropertiesUseCaseInterface } from './interfaces/unfavorite.auction.properties.usecase.interface';

@injectable()
export class UnFavoriteAuctionPropertiesUseCase
  implements UnFavoriteAuctionPropertiesUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private readonly _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute({
    auctionPropertyId,
    userId,
  }: AuctionPropertyUserFavoriteProps): Promise<void> {
    return await this._auctionPropertyRepository.unFavorite({
      auctionPropertyId,
      userId,
    });
  }
}
