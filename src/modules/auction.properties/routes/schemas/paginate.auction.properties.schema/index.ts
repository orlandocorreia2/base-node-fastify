import { querystring } from './querystring';
import { response } from './response';

export const paginateAuctionPropertiesSchema = {
  tags: ['AuctionProperty'],
  description: 'Paginate auction properties',
  querystring,
  response,
};
