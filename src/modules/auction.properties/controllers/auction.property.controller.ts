import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.batch.usecase.interface';
import { PaginateAuctionPropertiesResponse } from './responses/paginate.auction.properties.response';
import { PaginateAuctionPropertiesRequestProps } from '../usecases/types';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('PaginateAuctionPropertiesBatchUseCase')
    private readonly _paginateAuctionPropertiesBatchUse: PaginateAuctionPropertiesBatchUseCaseInterface,
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
}
