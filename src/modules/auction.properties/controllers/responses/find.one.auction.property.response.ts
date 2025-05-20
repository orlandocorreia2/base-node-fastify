import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { AuctionProperty } from '../../DTOs/auction.properties';
import { serializeBigInt } from '../../../../utils/number';

type FindOneAuctionPropertyResponseProps = {
  result: AuctionProperty;
  reply: FastifyReply;
};

export class FindOneAuctionPropertyResponse extends BaseResponse {
  static success({ result, reply }: FindOneAuctionPropertyResponseProps) {
    const dataResult = result
      ? {
          id: result.id,
          numberProperty: serializeBigInt(result.number_property),
          uf: result.uf,
          city: result.city,
          neighborhood: result.neighborhood,
          address: result.address,
          price: serializeBigInt(result.price),
          appraisalValue: serializeBigInt(result.appraisal_value),
          discount: serializeBigInt(result.discount),
          propertyType: result.property_type,
          description: result.description,
          saleMethod: result.sale_method,
          accessLink: result.access_link,
          acceptFinancing: result.accept_financing,
          photoLink: result.photo_link,
          registrationPropertyLink: result.registration_property_link,
        }
      : {};
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
