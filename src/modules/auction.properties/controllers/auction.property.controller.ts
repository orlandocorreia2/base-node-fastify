import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { CreateAuctionPropertiesBatchUseCaseInterface } from '../usecases/interfaces/create.auction.properties.batch.usecase.interface';
import { MultipartFile } from '@fastify/multipart';

@injectable()
export class AuctionPropertyController {
  constructor(
    @inject('CreateAuctionPropertiesBatchUseCase')
    private _createAuctionPropertiesBatchUseCase: CreateAuctionPropertiesBatchUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const multipartData = (await request.file()) as MultipartFile;
      const createdById = request.user.id;

      await this._createAuctionPropertiesBatchUseCase.execute(
        createdById,
        multipartData,
      );

      reply.send({
        version: '1.0.0',
        data: {
          totalRegisteredAuctionProperties: 10,
          totalRenewalAuctionProperties: 10,
          totalNotRegisteredAuctionProperties: 10,
          notRegisteredAuctionProperties: [
            'Erro na linha: 2. Imóvel não cadastrado devido a falha de validação.',
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
