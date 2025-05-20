import { querystring } from './querystring';
import { response } from './response';

export const paginateUsersSchema = {
  tags: ['Users'],
  description: 'Paginate users',
  querystring,
  response,
};
