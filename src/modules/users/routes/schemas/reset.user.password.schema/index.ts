import { body } from './body';
import { response } from './response';

export const resetUserPasswrodSchema = {
  tags: ['Users'],
  description: 'Reset user password',
  body,
  response,
};
