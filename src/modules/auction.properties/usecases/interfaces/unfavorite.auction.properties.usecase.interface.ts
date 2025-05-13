import { AuctionPropertyUserFavoriteProps } from '../../repositories/types';

export interface UnFavoriteAuctionPropertiesUseCaseInterface {
  execute(data: AuctionPropertyUserFavoriteProps): Promise<void>;
}
