import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { CreateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/create.auction.properties.batch.usecase.interface';
import { MultipartFile } from '@fastify/multipart';
import { CreateAuctionPropertiesBatchResponse } from './responses/create.auction.properties.batch.response';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('CreateAuctionPropertiesBatchUseCase')
    private _createAuctionPropertiesBatchUseCase: CreateAuctionPropertiesBatchUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const multipartData = (await request.file()) as MultipartFile;
      const createdById = request.user.id;
      const result = await this._createAuctionPropertiesBatchUseCase.execute(
        createdById,
        multipartData,
      );
      return CreateAuctionPropertiesBatchResponse.success({ result, reply });
    } catch (error) {
      CreateAuctionPropertiesBatchResponse.error(error);
    }
  }
}
