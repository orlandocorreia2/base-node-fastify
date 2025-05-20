import { body } from './body';
import { response } from './response';

export const createUserForgotPasswrodSchema = {
  tags: ['Users'],
  description: 'User forgot password',
  body,
  response,
};
