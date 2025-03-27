import { FastifyReply } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { CreateUsersBatchUseCaseInterface } from '../usecases/interfaces/create.users.batch.use.case.interface';
import { CreateUsersBatchResponse } from './responses/create.users.batch.response';

@injectable()
export class UsersBatchController {
  constructor(
    @inject('CreateUsersBatchUseCase')
    private _createUsersBatchUseCaseInterface: CreateUsersBatchUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const multipartData = (await request.file()) as MultipartFile;
      const createdById = request.user.id;
      const result = await this._createUsersBatchUseCaseInterface.execute(
        createdById,
        multipartData,
      );
      return CreateUsersBatchResponse.success({ result, reply });
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
