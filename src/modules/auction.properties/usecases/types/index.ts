export type CreateAuctionPropertyProps = {
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

export type PaginateAuctionPropertiesRequestProps = {
  page: number;
  qtdItemsPerPage: number;
  uf?: string;
  city?: string;
  sale_method?: string;
  property_type?: string;
  discount?: string;
  appraisal_value?: string;
};
