import { DBPaginateProps } from '../../../../types/db';
import { AuctionProperty } from '../../DTOs/auction.properties';
import { PaginateAuctionPropertiesRequestProps } from '../types';

export interface PaginateAuctionPropertiesUseCaseInterface {
  execute(
    data: PaginateAuctionPropertiesRequestProps,
  ): Promise<DBPaginateProps<AuctionProperty>>;
}
