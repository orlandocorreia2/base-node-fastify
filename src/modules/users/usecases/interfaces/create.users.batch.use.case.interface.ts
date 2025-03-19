import { MultipartFile } from '@fastify/multipart';
import { User } from '../../DTOs/user';

export interface CreateUsersBatchUseCaseInterface {
  execute(createdById: string, multipartData: MultipartFile): Promise<User[]>;
}
