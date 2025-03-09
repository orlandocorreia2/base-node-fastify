import { querystring } from './querystring';
import { response } from './response';

export const paginatePermissionGroupSchema = {
  tags: ['Permission Group'],
  description: 'Paginate permission groups',
  querystring,
  response,
};
