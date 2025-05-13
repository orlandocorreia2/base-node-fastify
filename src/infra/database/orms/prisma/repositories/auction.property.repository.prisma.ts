import { injectable } from 'tsyringe';
import { prisma } from '../client';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../../types/db';
import { positiveNumber } from '../../../../../utils/helper';
import { KeyValueProps } from '../../../../../types/types';
import { AuctionPropertyRepositoryInterface } from '../../../../../modules/auction.properties/repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyUserFavoriteProps } from '../../../../../modules/auction.properties/repositories/types';

@injectable()
export class AuctionPropertyRepositoryPrisma
  implements AuctionPropertyRepositoryInterface
{
  async paginate<T>({
    filter,
    page,
    qtdItemsPerPage,
    orderBy,
  }: DBPaginateParametersProps): Promise<T> {
    const where: KeyValueProps = filter ? (filter as KeyValueProps) : {};
    const total = await prisma.auctionProperty.count({ where });
    page = positiveNumber(page);
    qtdItemsPerPage = positiveNumber(qtdItemsPerPage);
    const skip = (page - 1) * qtdItemsPerPage;
    const result = await prisma.auctionProperty.findMany({
      where,
      skip,
      take: parseInt(qtdItemsPerPage.toString()),
      orderBy,
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async findOne<T>({ filter }: DBFindOneRepositoryProps): Promise<T> {
    return (await prisma.auctionProperty.findFirst({ where: filter })) as T;
  }

  async favorite({
    auctionPropertyId,
    userId,
  }: AuctionPropertyUserFavoriteProps): Promise<void> {
    const alreadyExists = await prisma.auctionPropertyUserFavorite.findFirst({
      where: {
        auction_property_id: auctionPropertyId,
        user_id: userId,
      },
    });
    if (!alreadyExists) {
      await prisma.auctionPropertyUserFavorite.create({
        data: { auction_property_id: auctionPropertyId, user_id: userId },
      });
    }
  }

  async unFavorite({
    auctionPropertyId,
    userId,
  }: AuctionPropertyUserFavoriteProps): Promise<void> {
    const alreadyExists = await prisma.auctionPropertyUserFavorite.findFirst({
      where: {
        auction_property_id: auctionPropertyId,
        user_id: userId,
      },
    });
    if (alreadyExists) {
      await prisma.auctionPropertyUserFavorite.delete({
        where: {
          user_id_auction_property_id: {
            auction_property_id: auctionPropertyId,
            user_id: userId,
          },
        },
      });
    }
  }
}
