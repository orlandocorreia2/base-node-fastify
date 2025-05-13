import { container } from 'tsyringe';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { AuctionPropertyRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/auction.property.repository.prisma';
import { PaginateAuctionPropertiesUseCase } from '../usecases/paginate.auction.properties.usecase';
import { PaginateAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/paginate.auction.properties.usecase.interface';
import { FindOneAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/find.one.auction.properties.usecase.interface';
import { FindOneAuctionPropertiesUseCase } from '../usecases/find.one.auction.properties.usecase';
import { FavoriteAuctionPropertiesUseCase } from '../usecases/favorite.auction.properties.usecase';
import { FavoriteAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/favorite.auction.properties.usecase.interface';
import { UnFavoriteAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/unfavorite.auction.properties.usecase.interface';
import { UnFavoriteAuctionPropertiesUseCase } from '../usecases/unfavorite.auction.properties.usecase';

container.registerSingleton<PaginateAuctionPropertiesUseCaseInterface>(
  'PaginateAuctionPropertiesUseCase',
  PaginateAuctionPropertiesUseCase,
);

container.registerSingleton<FindOneAuctionPropertiesUseCaseInterface>(
  'FindOneAuctionPropertiesUseCase',
  FindOneAuctionPropertiesUseCase,
);

container.registerSingleton<FavoriteAuctionPropertiesUseCaseInterface>(
  'FavoriteAuctionPropertiesUseCase',
  FavoriteAuctionPropertiesUseCase,
);

container.registerSingleton<UnFavoriteAuctionPropertiesUseCaseInterface>(
  'UnFavoriteAuctionPropertiesUseCase',
  UnFavoriteAuctionPropertiesUseCase,
);

container.registerSingleton<AuctionPropertyRepositoryInterface>(
  'AuctionPropertyRepository',
  AuctionPropertyRepositoryPrisma,
);
