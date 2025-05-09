import { params } from './params';
import { response } from './response';

export const deleteUserSchema = {
  tags: ['Users'],
  description: 'Delete user',
  params,
  response,
};
