import { AuctionPropertyUserFavoriteProps } from '../../repositories/types';

export interface FavoriteAuctionPropertiesUseCaseInterface {
  execute(data: AuctionPropertyUserFavoriteProps): Promise<void>;
}
