import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest, ParamRequestProps } from '../../../types/types';
import { FavoriteAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/favorite.auction.properties.usecase.interface';
import { UnFavoriteAuctionPropertiesUseCaseInterface } from '../usecases/interfaces/unfavorite.auction.properties.usecase.interface';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class AuctionPropertyFavoriteController {
  constructor(
    @inject('FavoriteAuctionPropertiesUseCase')
    private readonly _favoriteAuctionPropertiesUseCase: FavoriteAuctionPropertiesUseCaseInterface,
    @inject('UnFavoriteAuctionPropertiesUseCase')
    private readonly _unFavoriteAuctionPropertiesUseCase: UnFavoriteAuctionPropertiesUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      await this._favoriteAuctionPropertiesUseCase.execute({
        auctionPropertyId: id,
        userId: request.user.id,
      });
      return reply.status(201).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async delete(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      await this._unFavoriteAuctionPropertiesUseCase.execute({
        auctionPropertyId: id,
        userId: request.user.id,
      });
      return reply.status(200).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
