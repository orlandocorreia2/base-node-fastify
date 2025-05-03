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
    if (uf) result.AND.push({ uf: { in: uf.split('|') } });
    if (city) result.AND.push({ city: { in: city.split('|') } });
    if (sale_method)
      result.AND.push({ sale_method: { in: sale_method.split('|') } });
    if (property_type)
      result.AND.push({ property_type: { in: property_type.split('|') } });
    if (discount) {
      const discountGte = discount.split('|')[0].replace(/\D/g, '') ?? 0;
      const discountLte = discount.split('|')[1].replace(/\D/g, '') ?? 0;
      result.AND.push({
        discount: {
          gte: parseFloat(discountGte),
          lte: parseFloat(discountLte),
        },
      });
    }
    if (appraisal_value) {
      const appraisalValueGte =
        appraisal_value.split('|')[0].replace(/\D/g, '') ?? 0;
      const appraisalValueLte =
        appraisal_value.split('|')[1].replace(/\D/g, '') ?? 0;
      result.AND.push({
        appraisal_value: {
          gte: parseFloat(appraisalValueGte),
          lte: parseFloat(appraisalValueLte),
        },
      });
    }
    return result;
  }
}
