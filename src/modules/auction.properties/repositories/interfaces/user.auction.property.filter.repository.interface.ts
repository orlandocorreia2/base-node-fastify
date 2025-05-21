import { CreateUserAuctionPropertyFilterProps } from '../../DTOs/user.auction.property.filter';

export interface UserAuctionPropertyFilterRepositoryInterface {
  create<T>(data: CreateUserAuctionPropertyFilterProps): Promise<T>;
  findOne<T>(id: string): Promise<T>;
  findMany<T>(userId: string): Promise<T[]>;
  delete(id: string): Promise<void>;
}
