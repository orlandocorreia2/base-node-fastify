import { body } from './body';
import { response } from './response';

export const createUserAuctionPropertyFilterSchema = {
  tags: ['AuctionProperty'],
  description: 'Create user auction property filter',
  body,
  response,
};
