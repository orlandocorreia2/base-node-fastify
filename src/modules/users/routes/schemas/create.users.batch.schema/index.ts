import { body } from './body';
import { response } from './response';

export const createUsersBatchSchema = {
  tags: ['Users'],
  description: 'Create users batch',
  body,
  response,
};
