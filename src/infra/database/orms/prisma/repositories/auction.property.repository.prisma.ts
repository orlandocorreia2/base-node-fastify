import { injectable } from 'tsyringe';
import { prisma } from '../client';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../../types/db';
import { positiveNumber } from '../../../../../utils/helper';
import { KeyValueProps } from '../../../../../types/types';
import { AuctionPropertyRepositoryInterface } from '../../../../../modules/auction.properties/repositories/interfaces/auction.property.repository.interface';

@injectable()
export class AuctionPropertyRepositoryPrisma
  implements AuctionPropertyRepositoryInterface
{
  async paginate<T>({
    filter,
    page,
    qtdItemsPerPage,
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
      orderBy: { created_at: 'desc' },
    });
    return { items: result, page, qtdItemsPerPage, total } as T;
  }

  async findOne<T>({ filter }: DBFindOneRepositoryProps): Promise<T> {
    return (await prisma.auctionProperty.findFirst({ where: filter })) as T;
  }
}
