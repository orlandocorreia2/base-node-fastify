import { AuctionProperty } from '../../DTOs/auction.properties';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../types/db';
import {
  CreateAuctionPropertyRepositoryProps,
  PaginateAuctionPropertiesProps,
  UpdateAuctionPropertyRepositoryProps,
} from '../types';

export interface AuctionPropertyRepositoryInterface {
  create(data: CreateAuctionPropertyRepositoryProps): Promise<AuctionProperty>;
  createMany(data: CreateAuctionPropertyRepositoryProps[]): Promise<void>;
  paginate(
    data: DBPaginateParametersProps,
  ): Promise<PaginateAuctionPropertiesProps<AuctionProperty>>;
  findOne(data: DBFindOneRepositoryProps): Promise<AuctionProperty>;
  update(data: UpdateAuctionPropertyRepositoryProps): Promise<AuctionProperty>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
