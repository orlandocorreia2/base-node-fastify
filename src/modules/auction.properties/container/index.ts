import { container } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/auction.property.repository.prisma';
import { PaginateAuctionPropertiesUseCase } from '../usecases/paginate.auction.properties.usecase';
import { PaginateAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.usecase.interface';
import { FindOneAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/find.one.auction.properties.usecase.interface';
import { FindOneAuctionPropertiesUseCase } from '../usecases/find.one.auction.properties.usecase';

container.registerSingleton<PaginateAuctionPropertiesUseCaseInterface>(
  'PaginateAuctionPropertiesUseCase',
  PaginateAuctionPropertiesUseCase,
);

container.registerSingleton<FindOneAuctionPropertiesUseCaseInterface>(
  'FindOneAuctionPropertiesUseCase',
  FindOneAuctionPropertiesUseCase,
);

container.registerSingleton<AuctionPropertyRepositoryInterface>(
  'AuctionPropertyRepository',
  AuctionPropertyRepositoryPrisma,
);
