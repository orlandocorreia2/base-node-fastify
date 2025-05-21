import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest, ParamRequestProps } from '../../../types/types';
import { CreateUserAuctionPropertyFilterRequestProps } from '../DTOs/user.auction.property.filter';
import { CreateUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/create.user.auction.property.filter.usecase.interface';
import { FindAllUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/find.all.user.auction.property.filter.usecase.interface';
import { DeleteUserAuctionPropertyFilterUseCaseInterface } from '../usecases/interfaces/delete.user.auction.property.filter.usecase.interface';
import { UnexpectedError } from '../../../error/unexpected.error';
import { FindAllUserAuctionPropertyFiltersResponse } from './responses/find.all.user.auction.property.filters.response';

@injectable()
export class UserAuctionPropertyFilterController {
  constructor(
    @inject('CreateUserAuctionPropertyFilterUseCase')
    private readonly _createUserAuctionPropertyFilterUseCase: CreateUserAuctionPropertyFilterUseCaseInterface,
    @inject('FindAllUserAuctionPropertyFilterUseCase')
    private readonly _findAllUserAuctionPropertyFilterUseCase: FindAllUserAuctionPropertyFilterUseCaseInterface,
    @inject('DeleteUserAuctionPropertyFilterUseCase')
    private readonly _deleteUserAuctionPropertyFilterUseCase: DeleteUserAuctionPropertyFilterUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const { name, filter } =
        request.body as CreateUserAuctionPropertyFilterRequestProps;
      await this._createUserAuctionPropertyFilterUseCase.execute({
        userId: request.user.id,
        name,
        filter,
      });
      return reply.status(201).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findAll(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const result =
        await this._findAllUserAuctionPropertyFilterUseCase.execute(
          request.user.id,
        );
      return FindAllUserAuctionPropertyFiltersResponse.success({
        result,
        reply,
      });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      await this._deleteUserAuctionPropertyFilterUseCase.execute(id);
      return reply.status(200).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
