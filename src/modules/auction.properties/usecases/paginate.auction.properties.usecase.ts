import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { PaginateAuctionPropertiesUseCaseInterface } from './interfaces/paginate.auction.properties.usecase.interface';
import { DBAndFilterProps, DBPaginateProps } from '../../../types/db';
import { AuctionProperty } from '../DTOs/auction.properties';
import { PaginateAuctionPropertiesRequestProps } from './types';
import { generateOrderBy } from '../../../utils/db';

@injectable()
export class PaginateAuctionPropertiesUseCase
  implements PaginateAuctionPropertiesUseCaseInterface
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
    saleMethod,
    propertyType,
    discount,
    appraisalValue,
    acceptFinancing,
    favorite,
    orderBy,
    orderByDirection,
    authUserId,
  }: PaginateAuctionPropertiesRequestProps): Promise<
    DBPaginateProps<AuctionProperty>
  > {
    const generatedOrderBy = generateOrderBy({
      orderBy,
      orderByDirection,
      tableFields: ['discount'],
      defaultTableField: 'created_at',
    });

    const filter = this.generateFilter({
      uf,
      city,
      saleMethod,
      propertyType,
      discount,
      appraisalValue,
      acceptFinancing,
      favorite,
      authUserId,
    });
    const result = await this._auctionPropertyRepository.paginate({
      page,
      qtdItemsPerPage,
      filter,
      orderBy: generatedOrderBy,
    });
    return result;
  }

  private generateFilter({
    uf,
    city,
    saleMethod,
    propertyType,
    discount,
    appraisalValue,
    acceptFinancing,
    favorite,
    authUserId,
  }: Omit<
    PaginateAuctionPropertiesRequestProps,
    'page' | 'qtdItemsPerPage'
  >): DBAndFilterProps {
    const result: DBAndFilterProps = { AND: [] };
    this.addFilter(result, 'uf', uf);
    this.addFilter(result, 'city', city);
    this.addFilter(result, 'sale_method', saleMethod);
    this.addFilter(result, 'property_type', propertyType);
    if (discount) {
      const [discountMin, discountMax] = discount.split('|');
      let discountValue = discountMin.replace(/\D/g, '').padEnd(4, '0');
      if (
        discountMax &&
        parseInt(discountMax) > 0 &&
        parseInt(discountMin) < parseInt(discountMax)
      ) {
        discountValue += `|${discountMin.replace(/\D/g, '').padEnd(4, '0')}`;
      }
      this.addRangeFilter(result, 'discount', discountValue);
    }
    if (appraisalValue) {
      const [appraisalValueMin, appraisalValueMax] = appraisalValue.split('|');
      let appraisalVal = appraisalValueMin.replace(/\D/g, '').padEnd(4, '0');
      if (
        appraisalValueMax &&
        parseInt(appraisalValueMax) > 0 &&
        parseInt(appraisalValueMin) < parseInt(appraisalValueMax)
      ) {
        appraisalVal += `|${appraisalValueMin.replace(/\D/g, '').padEnd(4, '0')}`;
      }
      this.addRangeFilter(result, 'appraisal_value', appraisalVal);
    }
    if (acceptFinancing) {
      result.AND.push({ accept_financing: acceptFinancing === 'true' });
    }
    if (favorite === 'true') {
      result.AND.push({
        AuctionPropertyUserFavorite: { some: { user: { id: authUserId } } },
      });
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
