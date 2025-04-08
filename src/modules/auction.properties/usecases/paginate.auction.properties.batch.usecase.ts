import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from './interfaces/paginate.auction.properties.batch.usecase.interface';
import { PaginateRequestProps } from '../../../types/types';
import { DBPaginateProps } from '../../../types/db';
import { AuctionProperty } from '../DTOs/auction.properties';

@injectable()
export class PaginateAuctionPropertiesBatchUseCase
  implements PaginateAuctionPropertiesBatchUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute({
    page,
    qtdItemsPerPage,
    filter,
  }: PaginateRequestProps): Promise<DBPaginateProps<AuctionProperty>> {
    const result = await this._auctionPropertyRepository.paginate({
      page,
      qtdItemsPerPage,
      filter,
    });
    return result;
  }
}
