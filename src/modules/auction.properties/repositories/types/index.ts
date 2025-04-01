import { DBPaginateProps } from '../../../../types/db';

export type PaginateAuctionPropertiesProps<T> = DBPaginateProps<T>;

export type CreateAuctionPropertyRepositoryProps = {
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

export type UpdateAuctionPropertyRepositoryProps = {
  id: string;
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
