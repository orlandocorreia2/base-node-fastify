import { container } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/auction.property.repository.prisma';
import { PaginateAuctionPropertiesBatchUseCase } from '../usecases/paginate.auction.properties.batch.usecase';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.batch.usecase.interface';
import { FindOneAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/find.one.auction.properties.batch.usecase.interface';
import { FindOneAuctionPropertiesBatchUseCase } from '../usecases/find.one.auction.properties.batch.usecase';

container.registerSingleton<PaginateAuctionPropertiesBatchUseCaseInterface>(
  'PaginateAuctionPropertiesBatchUseCase',
  PaginateAuctionPropertiesBatchUseCase,
);

container.registerSingleton<FindOneAuctionPropertiesBatchUseCaseInterface>(
  'FindOneAuctionPropertiesBatchUseCase',
  FindOneAuctionPropertiesBatchUseCase,
);

container.registerSingleton<AuctionPropertyRepositoryInterface>(
  'AuctionPropertyRepository',
  AuctionPropertyRepositoryPrisma,
);
