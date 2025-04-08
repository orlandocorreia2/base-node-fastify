import { DBPaginateProps } from '../../../../types/db';
import { PaginateRequestProps } from '../../../../types/types';
import { AuctionProperty } from '../../DTOs/auction.properties';

export interface PaginateAuctionPropertiesBatchUseCaseInterface {
  execute({
    page,
    qtdItemsPerPage,
    filter,
  }: PaginateRequestProps): Promise<DBPaginateProps<AuctionProperty>>;
}
