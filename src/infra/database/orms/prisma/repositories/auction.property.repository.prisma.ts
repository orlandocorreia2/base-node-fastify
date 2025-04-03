import { injectable } from 'tsyringe';
import { prisma } from '../client';
import {
  DBFindOneRepositoryProps,
  DBPaginateParametersProps,
} from '../../../../../types/db';
import { positiveNumber } from '../../../../../utils/helper';
import { KeyValueProps } from '../../../../../types/types';
import { AuctionPropertyRepositoryInterface } from '../../../../../modules/auction.properties/repositories/interfaces/auction.property.repository.interface';
import {
  CreateAuctionPropertyRepositoryProps,
  UpdateAuctionPropertyRepositoryProps,
  UpsertAuctionPropertyRepositoryProps,
} from '../../../../../modules/auction.properties/repositories/types';

@injectable()
export class AuctionPropertyRepositoryPrisma
  implements AuctionPropertyRepositoryInterface
{
  async findOne<T>({ filter }: DBFindOneRepositoryProps): Promise<T> {
    return (await prisma.auctionProperty.findFirst({ where: filter })) as T;
  }

  async paginate<T>({
    filter,
    page,
    qtdItemsPerPage,
  }: DBPaginateParametersProps): Promise<T> {
    const where: KeyValueProps = filter
      ? {
          OR: [{ name: { contains: filter, mode: 'insensitive' } }],
        }
      : {};
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

  async create<T>(data: CreateAuctionPropertyRepositoryProps): Promise<T> {
    return (await prisma.auctionProperty.create({ data })) as T;
  }

  async createMany(
    data: CreateAuctionPropertyRepositoryProps[],
  ): Promise<void> {
    await prisma.auctionProperty.createMany({
      data,
    });
  }

  async update<T>(data: UpdateAuctionPropertyRepositoryProps): Promise<T> {
    prisma.auctionProperty.upsert;
    return (await prisma.auctionProperty.update({
      where: { id: data.id },
      data,
    })) as T;
  }

  async upsert<T>({
    filter,
    create,
    update,
  }: UpsertAuctionPropertyRepositoryProps): Promise<T> {
    return (await prisma.auctionProperty.upsert({
      where: filter,
      create,
      update,
    })) as T;
  }

  async delete(id: string): Promise<void> {
    await prisma.auctionProperty.delete({ where: { id } });
  }

  async deleteAll(): Promise<void> {
    await prisma.auctionProperty.deleteMany();
  }
}
