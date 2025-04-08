import { FastifyReply, FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest, PaginateRequestProps } from '../../../types/types';
import { CreateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/create.auction.properties.batch.usecase.interface';
import { CreateAuctionPropertiesBatchResponse } from './responses/create.auction.properties.batch.response';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.batch.usecase.interface';
import { PaginateAuctionPropertiesResponse } from './responses/paginate.auction.properties.response';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('CreateAuctionPropertiesBatchUseCase')
    private _createAuctionPropertiesBatchUseCase: CreateAuctionPropertiesBatchUseCaseInterface,
    @inject('PaginateAuctionPropertiesBatchUseCase')
    private _paginateAuctionPropertiesBatchUse: PaginateAuctionPropertiesBatchUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const createdById = request.user.id;
      const multipartData = (await request.file()) as MultipartFile;
      const result = await this._createAuctionPropertiesBatchUseCase.execute(
        createdById,
        multipartData,
      );
      return CreateAuctionPropertiesBatchResponse.success({ result, reply });
    } catch (error) {
      CreateAuctionPropertiesBatchResponse.error(error);
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, qtdItemsPerPage, filter } =
        request.query as PaginateRequestProps;
      const result = await this._paginateAuctionPropertiesBatchUse.execute({
        page,
        qtdItemsPerPage,
        filter,
      });
      return PaginateAuctionPropertiesResponse.success({ result, reply });
    } catch (error) {
      PaginateAuctionPropertiesResponse.error(error);
    }
  }
}
