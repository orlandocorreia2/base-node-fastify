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
  saleMethod?: string;
  propertyType?: string;
  discount?: string;
  appraisalValue?: string;
  acceptFinancing?: string;
  favorite?: string;
  orderBy?: string;
  orderByDirection?: string;
  authUserId?: string;
};
