import { MultipartFile } from '@fastify/multipart';
import { UserCreateBatchMessagesProps } from '../types';

export interface CreateUsersBatchUseCaseInterface {
  execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<UserCreateBatchMessagesProps>;
}
