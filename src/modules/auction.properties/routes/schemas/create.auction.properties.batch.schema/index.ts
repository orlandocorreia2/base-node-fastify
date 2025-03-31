import { body } from './body';
import { response } from './response';

export const createAuctionPropertiesBatchSchema = {
  tags: ['AuctionProperty'],
  description: 'Create auction property batch',
  body,
  response,
};
