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
import { CreateUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/create.user.auction.property.filter.usecase.interface';
import { CreateUserAuctionPropertyFilterUseCase } from '../usecases/create.user.auction.property.filter.usecase';
import { FindAllUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/find.all.user.auction.property.filter.usecase.interface';
import { FindAllUserAuctionPropertyFilterUseCase } from '../usecases/find.all.user.auction.property.filter.usecase';
import { DeleteUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/delete.user.auction.property.filter.usecase.interface';
import { DeleteUserAuctionPropertyFilterUseCase } from '../usecases/delete.user.auction.property.filter.usecase';
import { UserAuctionPropertyFilterRepositoryInterface } from '../repositories/interfaces/user.auction.property.filter.repository.interface';
import { UserAuctionPropertyFilterRepositoryPrisma } from '../../../infra/database/orms/prisma/repositories/user.auction.property.filter.repository.prisma';

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

container.registerSingleton<CreateUserAuctionPropertyFilterUseCaseInterface>(
  'CreateUserAuctionPropertyFilterUseCase',
  CreateUserAuctionPropertyFilterUseCase,
);

container.registerSingleton<FindAllUserAuctionPropertyFilterUseCaseInterface>(
  'FindAllUserAuctionPropertyFilterUseCase',
  FindAllUserAuctionPropertyFilterUseCase,
);

container.registerSingleton<DeleteUserAuctionPropertyFilterUseCaseInterface>(
  'DeleteUserAuctionPropertyFilterUseCase',
  DeleteUserAuctionPropertyFilterUseCase,
);

container.registerSingleton<AuctionPropertyRepositoryInterface>(
  'AuctionPropertyRepository',
  AuctionPropertyRepositoryPrisma,
);

container.registerSingleton<UserAuctionPropertyFilterRepositoryInterface>(
  'UserAuctionPropertyFilterRepository',
  UserAuctionPropertyFilterRepositoryPrisma,
);
