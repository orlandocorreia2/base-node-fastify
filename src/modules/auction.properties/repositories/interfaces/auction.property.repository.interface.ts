import { AuctionProperty } from '../../DTOs/auction.properties';
import { DBPaginateParametersProps } from '../../../../types/db';
import { PaginateAuctionPropertiesProps } from '../types';

export interface AuctionPropertyRepositoryInterface {
  paginate(
    data: DBPaginateParametersProps,
  ): Promise<PaginateAuctionPropertiesProps<AuctionProperty>>;
}
