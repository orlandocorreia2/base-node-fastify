import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from './interfaces/paginate.auction.properties.batch.usecase.interface';
import { DBAndFilterProps, DBPaginateProps } from '../../../types/db';
import { AuctionProperty } from '../DTOs/auction.properties';
import { PaginateAuctionPropertiesRequestProps } from './types';

@injectable()
export class PaginateAuctionPropertiesBatchUseCase
  implements PaginateAuctionPropertiesBatchUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private readonly _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute({
    page,
    qtdItemsPerPage,
    uf,
    city,
    sale_method,
    property_type,
    discount,
    appraisal_value,
  }: PaginateAuctionPropertiesRequestProps): Promise<
    DBPaginateProps<AuctionProperty>
  > {
    const filter = this.generateFilter({
      uf,
      city,
      sale_method,
      property_type,
      discount,
      appraisal_value,
    });
    const result = await this._auctionPropertyRepository.paginate({
      page,
      qtdItemsPerPage,
      filter,
    });
    return result;
  }

  private generateFilter({
    uf,
    city,
    sale_method,
    property_type,
    discount,
    appraisal_value,
  }: Omit<
    PaginateAuctionPropertiesRequestProps,
    'page' | 'qtdItemsPerPage'
  >): DBAndFilterProps {
    const result: DBAndFilterProps = { AND: [] };
    this.addFilter(result, 'uf', uf);
    this.addFilter(result, 'city', city);
    this.addFilter(result, 'sale_method', sale_method);
    this.addFilter(result, 'property_type', property_type);
    if (discount) {
      this.addRangeFilter(result, 'discount', discount);
    }
    if (appraisal_value) {
      this.addRangeFilter(result, 'appraisal_value', appraisal_value);
    }
    return result;
  }

  private addFilter(
    result: DBAndFilterProps,
    field: string,
    value?: string,
  ): void {
    if (value) {
      result.AND.push({ [field]: { in: value.split('|') } });
    }
  }

  private addRangeFilter(
    result: DBAndFilterProps,
    field: string,
    range?: string,
  ): void {
    if (range) {
      const rangeSplit = range.split('|');
      if (rangeSplit && rangeSplit.length > 0) {
        const rangeParams: { gte: number; lte?: number } = { gte: 0 };
        const rangeGte = rangeSplit[0].replace(/\D/g, '') ?? 0;
        rangeParams.gte = parseFloat(rangeGte);
        if (rangeSplit.length > 1) {
          const rangeLte = rangeSplit[1].replace(/\D/g, '') ?? 0;
          rangeParams.lte = parseFloat(rangeLte);
        }
        result.AND.push({ [field]: rangeParams });
      }
    }
  }
}
