import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.batch.usecase.interface';
import { PaginateAuctionPropertiesResponse } from './responses/paginate.auction.properties.response';
import { PaginateAuctionPropertiesRequestProps } from '../usecases/types';
import { ParamRequestProps } from '../../../types/types';
import { FindOneAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/find.one.auction.properties.batch.usecase.interface';
import { FindOneAuctionPropertyResponse } from './responses/find.one.auction.property.response';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('PaginateAuctionPropertiesBatchUseCase')
    private readonly _paginateAuctionPropertiesBatchUse: PaginateAuctionPropertiesBatchUseCaseInterface,
    @inject('FindOneAuctionPropertiesBatchUseCase')
    private readonly FindOneAuctionPropertiesBatchUseCase: FindOneAuctionPropertiesBatchUseCaseInterface,
  ) {}

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        page,
        qtdItemsPerPage,
        uf,
        city,
        sale_method,
        property_type,
        discount,
        appraisal_value,
      } = request.query as PaginateAuctionPropertiesRequestProps;
      const result = await this._paginateAuctionPropertiesBatchUse.execute({
        page,
        qtdItemsPerPage,
        uf,
        city,
        sale_method,
        property_type,
        discount,
        appraisal_value,
      });
      return PaginateAuctionPropertiesResponse.success({ result, reply });
    } catch (error) {
      PaginateAuctionPropertiesResponse.error(error);
    }
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const result =
        await this.FindOneAuctionPropertiesBatchUseCase.execute(id);
      return FindOneAuctionPropertyResponse.success({ result, reply });
    } catch (error) {
      FindOneAuctionPropertyResponse.error(error);
    }
  }
}
