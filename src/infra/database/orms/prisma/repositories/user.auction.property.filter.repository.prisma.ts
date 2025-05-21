import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { UserAuctionPropertyFilterRepositoryInterface } from '../../../../../modules/auction.properties/repositories/interfaces/user.auction.property.filter.repository.interface';
import { CreateUserAuctionPropertyFilterProps } from '../../../../../modules/auction.properties/DTOs/user.auction.property.filter';

@injectable()
export class UserAuctionPropertyFilterRepositoryPrisma
  implements UserAuctionPropertyFilterRepositoryInterface
{
  async create<T>({
    userId,
    name,
    filter,
  }: CreateUserAuctionPropertyFilterProps): Promise<T> {
    return (await prisma.userAuctionPropertyFilter.create({
      data: { user_id: userId, name, filter },
    })) as T;
  }

  async findOne<T>(id: string): Promise<T> {
    return (await prisma.userAuctionPropertyFilter.findFirst({
      where: { id },
    })) as T;
  }

  async findMany<T>(userId: string): Promise<T> {
    return (await prisma.userAuctionPropertyFilter.findMany({
      where: { user_id: userId },
    })) as T;
  }

  async delete(id: string): Promise<void> {
    await prisma.userAuctionPropertyFilter.delete({
      where: { id },
    });
  }
}
