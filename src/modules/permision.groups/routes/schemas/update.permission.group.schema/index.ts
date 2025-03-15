import { body } from './body';
import { params } from './params';
import { response } from './response';

export const createPermissionGroupSchema = {
  tags: ['Permission Group'],
  description: 'Create a new permission group',
  params,
  body,
  response,
};
