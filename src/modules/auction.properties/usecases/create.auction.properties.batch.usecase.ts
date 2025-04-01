import { MultipartFile } from '@fastify/multipart';
import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { getRows } from '../../../utils/xlsx';
import { CreateAuctionPropertiesBatchUseCaseInterface } from './interfaces/create.auction.properties.batch.usecase.interface';
import { AuctionPropertyRepositoryInterface } from '../repositories/interfaces/auction.property.repository.interface';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from './types';

@injectable()
export class CreateAuctionPropertiesBatchUseCase
  implements CreateAuctionPropertiesBatchUseCaseInterface
{
  constructor(
    @inject('AuctionPropertyRepository')
    private _auctionPropertyRepository: AuctionPropertyRepositoryInterface,
  ) {}

  public async execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<CreateAuctionPropertiesBatchUseCaseExecuteResponseProps> {
    this.validateMultipartDataForm(multipartData);
    await this._auctionPropertyRepository.deleteAll();
    let auctionPropertiesBatch: any[] = [];
    let total = 0;
    const rows = await getRows(multipartData);
    for (let row of rows) {
      const {
        __EMPTY: number_property,
        __EMPTY_1: uf,
        __EMPTY_2: city,
        __EMPTY_3: neighborhood,
        __EMPTY_4: address,
        __EMPTY_5: price,
        __EMPTY_6: appraisal_value,
        __EMPTY_7: discount,
        __EMPTY_8: description,
        __EMPTY_9: sale_method,
        __EMPTY_10: access_link,
      } = row;
      if (typeof number_property === 'number') {
        total++;
        if (auctionPropertiesBatch.length <= 1000) {
          auctionPropertiesBatch.push({
            created_by_id: createdById,
            number_property,
            uf,
            city,
            neighborhood,
            address,
            price: parseFloat(price),
            appraisal_value: parseFloat(appraisal_value),
            discount: parseFloat(discount),
            description,
            sale_method,
            access_link,
          });
        }
        if (auctionPropertiesBatch.length > 999) {
          await this._auctionPropertyRepository.createMany(
            auctionPropertiesBatch,
          );
          auctionPropertiesBatch = [];
          console.log('Created auction properties batch', { total });
        }
      }
    }
    if (auctionPropertiesBatch.length > 0) {
      await this._auctionPropertyRepository.createMany(auctionPropertiesBatch);
      console.log('Created auction properties batch', {
        total,
        rest: auctionPropertiesBatch.length,
      });
    }
    return { message: `Total saved auction properties batch: ${total}` };
  }

  private validateMultipartDataForm(multipartData: MultipartFile) {
    if (!multipartData || multipartData.mimetype !== 'text/csv') {
      throw new UnprocessableError(
        'Arquivo com extensão .csv não encontrado ou inválido!',
      );
    }
  }
}
