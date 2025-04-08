import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { DBPaginateProps } from 'types/db';
import { AuctionProperty } from '../../DTOs/auction.properties';

type PaginateAuctionPropertiesResponseProps = {
  result: DBPaginateProps<AuctionProperty>;
  reply: FastifyReply;
};

export class PaginateAuctionPropertiesResponse extends BaseResponse {
  static success({ result, reply }: PaginateAuctionPropertiesResponseProps) {
    const items = result.items.map((item: AuctionProperty) => {
      return {
        id: item.id,
        numberProperty: parseInt(item.number_property.toString()),
        uf: item.uf,
        city: item.city,
        neighborhood: item.neighborhood,
        address: item.address,
        price: item.price,
        appraisalValue: item.appraisal_value,
        discount: item.discount,
        description: item.description,
        saleMethod: item.sale_method,
        accessLink: item.access_link,
        acceptFinancing: !!item.accept_financing ? 'SIM' : 'NÃO',
      };
    });
    const paginateData = this.setPaginateData<DBPaginateProps<any>>(result);
    paginateData.data.items = items;
    return reply.status(200).send(paginateData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
