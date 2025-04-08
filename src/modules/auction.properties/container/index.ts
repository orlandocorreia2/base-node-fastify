import { container } from 'tsyringe';
import { CreateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/create.auction.properties.batch.usecase.interface';
import { CreateAuctionPropertiesBatchUseCase } from '../usecases/create.auction.properties.batch.usecase';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/auction.property.repository.prisma';
import { PaginateAuctionPropertiesBatchUseCase } from '../usecases/paginate.auction.properties.batch.usecase';
import { PaginateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.batch.usecase.interface';

container.registerSingleton<CreateAuctionPropertiesBatchUseCaseInterface>(
  'CreateAuctionPropertiesBatchUseCase',
  CreateAuctionPropertiesBatchUseCase,
);

container.registerSingleton<PaginateAuctionPropertiesBatchUseCaseInterface>(
  'PaginateAuctionPropertiesBatchUseCase',
  PaginateAuctionPropertiesBatchUseCase,
);

container.registerSingleton<AuctionPropertyRepositoryInterface>(
  'AuctionPropertyRepository',
  AuctionPropertyRepositoryPrisma,
);
