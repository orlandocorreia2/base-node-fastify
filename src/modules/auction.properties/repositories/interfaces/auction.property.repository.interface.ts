import { AuctionProperty } from '../../DTOs/auction.properties';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import {
  AuctionPropertyUserFavoriteProps,
  PaginateAuctionPropertiesProps,
} from '../types';

export interface AuctionPropertyRepositoryInterface {
  paginate(
    data: DBPaginateParametersProps,
  ): Promise<PaginateAuctionPropertiesProps<AuctionProperty>>;
  findOne<T>(data: DBFindOneRepositoryProps): Promise<T>;
  favorite(data: AuctionPropertyUserFavoriteProps): Promise<void>;
  unFavorite(data: AuctionPropertyUserFavoriteProps): Promise<void>;
}
