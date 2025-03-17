import { params } from './params';
import { response } from './response';

export const findOneUserSchema = {
  tags: ['Users'],
  description: 'User details',
  params,
  response,
};
