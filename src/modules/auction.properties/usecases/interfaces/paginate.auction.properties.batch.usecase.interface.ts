import { DBPaginateProps } from '../../../../types/db';
import { AuctionProperty } from '../../DTOs/auction.properties';
import { PaginateAuctionPropertiesRequestProps } from '../types';

export interface PaginateAuctionPropertiesBatchUseCaseInterface {
  execute({
    page,
    qtdItemsPerPage,
    uf,
    city,
    sale_method,
    property_type,
    discount,
    appraisal_value,
  }: PaginateAuctionPropertiesRequestProps): Promise<
    DBPaginateProps<AuctionProperty>
  >;
}
