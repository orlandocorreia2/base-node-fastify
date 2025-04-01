export type CreateAuctionPropertyProps = {
  created_by_id: string;
  number_property: number;
  uf: string;
  city: string;
  neighborhood: string;
  address: string;
  price: number;
  appraisal_value: number;
  discount: number;
  description: string;
  sale_method: string;
  access_link: string;
};

export type AuctionPropertiesCreateBatchMessagesProps = {
  totalRegistered: number;
  totalRenewal: number;
  totalNotRegistered: number;
  notRegistered: any[];
};

export type CreateAuctionPropertiesBatchUseCaseExecuteResponseProps = {
  message: string;
};
