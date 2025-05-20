import { inject, injectable } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionProperty } from '../DTOs/auction.properties';
import { FindOneAuctionPropertiesUseCaseInterface } from './interfaces/find.one.auction.properties.usecase.interface';

@injectable()
export class FindOneAuctionPropertiesUseCase
  implements FindOneAuctionPropertiesUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private readonly _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<AuctionProperty> {
    return await this._auctionPropertyRepository.findOne({
      filter: { id },
    });
  }
}
