import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { PaginateAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.usecase.interface';
import { PaginateAuctionPropertiesResponse } from './responses/paginate.auction.properties.response';
import { PaginateAuctionPropertiesRequestProps } from '../usecases/types';
import { ParamRequestProps } from '../../../types/types';
import { FindOneAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/find.one.auction.properties.usecase.interface';
import { FindOneAuctionPropertyResponse } from './responses/find.one.auction.property.response';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('PaginateAuctionPropertiesUseCase')
    private readonly _paginateAuctionPropertiesUseCase: PaginateAuctionPropertiesUseCaseInterface,
    @inject('FindOneAuctionPropertiesUseCase')
    private readonly _findOneAuctionPropertiesUseCase: FindOneAuctionPropertiesUseCaseInterface,
  ) {}

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        page,
        qtdItemsPerPage,
        uf,
        city,
        saleMethod,
        propertyType,
        appraisalValue,
        acceptFinancing,
        orderBy,
        orderByDirection,
      } = request.query as PaginateAuctionPropertiesRequestProps;
      const result = await this._paginateAuctionPropertiesUseCase.execute({
        page,
        qtdItemsPerPage,
        uf,
        city,
        saleMethod,
        propertyType,
        appraisalValue,
        acceptFinancing,
        orderBy,
        orderByDirection,
      });
      return PaginateAuctionPropertiesResponse.success({ result, reply });
    } catch (error) {
      PaginateAuctionPropertiesResponse.error(error);
    }
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const result = await this._findOneAuctionPropertiesUseCase.execute(id);
      return FindOneAuctionPropertyResponse.success({ result, reply });
    } catch (error) {
      FindOneAuctionPropertyResponse.error(error);
    }
  }
}
