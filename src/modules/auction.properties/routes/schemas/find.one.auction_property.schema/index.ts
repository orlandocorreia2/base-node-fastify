import { params } from './params';
import { response } from './response';

export const findOneAuctionPropertySchema = {
  tags: ['AuctionProperty'],
  description: 'Find one auction property',
  params,
  response,
};
