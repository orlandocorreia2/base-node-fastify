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
  property_type: string;
  description: string;
  sale_method: string;
  access_link: string;
  accept_financing?: boolean;
  photo_link?: string;
  registration_property_link?: string;
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
  property_type: string;
  description: string;
  sale_method: string;
  access_link: string;
  accept_financing?: boolean;
  photo_link?: string;
  registration_property_link?: string;
};

export type UpsertAuctionPropertyRepositoryProps = {
  filter: any;
  create: CreateAuctionPropertyRepositoryProps;
  update: Omit<UpdateAuctionPropertyRepositoryProps, 'id'>;
};
