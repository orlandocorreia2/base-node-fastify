import { FastifyReply } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { CreateUsersBatchUseCaseInterface } from '../usecases/interfaces/create.users.batch.use.case.interface';

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
      this._createUsersBatchUseCaseInterface.execute(
        createdById,
        multipartData,
      );
      return reply.status(201).send();
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
