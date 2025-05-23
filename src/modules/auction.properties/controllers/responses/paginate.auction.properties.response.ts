import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { DBPaginateProps } from '../../../../types/db';
import { AuctionProperty } from '../../DTOs/auction.properties';
import { serializeBigInt } from '../../../../utils/number';

type PaginateAuctionPropertiesResponseProps = {
  result: DBPaginateProps<AuctionProperty>;
  reply: FastifyReply;
};

export class PaginateAuctionPropertiesResponse extends BaseResponse {
  static success({ result, reply }: PaginateAuctionPropertiesResponseProps) {
    const items = result.items.map((item: AuctionProperty) => {
      return {
        id: item.id,
        numberProperty: serializeBigInt(item.number_property),
        uf: item.uf,
        city: item.city,
        neighborhood: item.neighborhood,
        address: item.address,
        price: serializeBigInt(item.price),
        appraisalValue: serializeBigInt(item.appraisal_value),
        discount: serializeBigInt(item.discount),
        propertyType: item.property_type,
        description: item.description,
        saleMethod: item.sale_method,
        accessLink: item.access_link,
        acceptFinancing: item.accept_financing,
        photoLink: item.photo_link ?? '',
        registrationPropertyLink: item.registration_property_link ?? '',
        favorite:
          item.AuctionPropertyUserFavorite &&
          item.AuctionPropertyUserFavorite?.length > 0,
      };
    });
    const paginateData = this.setPaginateData<DBPaginateProps<any>>(result);
    paginateData.data.items = items;
    return reply.status(200).send(paginateData);
  }
}
