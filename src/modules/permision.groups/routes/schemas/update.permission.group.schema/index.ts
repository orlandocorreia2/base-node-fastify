import { body } from './body';
import { params } from './params';
import { response } from './response';

export const updatePermissionGroupSchema = {
  tags: ['Permission Group'],
  description: 'Update permission group',
  params,
  body,
  response,
};
