import { body } from './body';
import { params } from './params';
import { response } from './response';

export const updateUserSchema = {
  tags: ['Users'],
  description: 'Update user',
  params,
  body,
  response,
};
