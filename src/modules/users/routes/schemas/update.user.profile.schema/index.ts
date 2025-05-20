import { body } from './body';
import { response } from './response';

export const updateUserProfileSchema = {
  tags: ['Users'],
  description: 'Update user profile',
  body,
  response,
};
