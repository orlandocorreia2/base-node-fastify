import { container } from 'tsyringe';
import { CreateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/create.auction.properties.batch.usecase.interface';
import { CreateAuctionPropertiesBatchUseCase } from '../usecases/create.auction.properties.batch.usecase';

container.registerSingleton<CreateAuctionPropertiesBatchUseCaseInterface>(
  'CreateAuctionPropertiesBatchUseCase',
  CreateAuctionPropertiesBatchUseCase,
);
