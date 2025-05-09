import { body } from './body';
import { response } from './response';

export const createPermissionGroupSchema = {
  tags: ['Permission Group'],
  description: 'Create a new permission group',
  body,
  response,
};
