import { DBPaginateProps } from '../../../../types/db';

export type PaginateAuctionPropertiesProps<T> = DBPaginateProps<T>;

export type AuctionPropertyUserFavoriteProps = {
  auctionPropertyId: string;
  userId: string;
};
