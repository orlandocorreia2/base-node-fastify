import { KeyValueProps } from './types';

export type DBCreateParameterProps = {
  data: unknown;
};

export type DBCreateManyParameterProps = {
  data: any[];
};

export type DBFindFirstParameterProps = {
  where?: KeyValueProps;
};

export type DBFindManyParametersProps = {
  where?: KeyValueProps;
  skip?: number;
  take?: number;
};

export type DBPaginateProps<T> = {
  items: T[];
  page: number;
  qtdItemsPerPage: number;
  total: number;
};

export type DBPaginateParametersProps = {
  filter?: string | DBAndFilterProps;
  page: number;
  qtdItemsPerPage: number;
  relationships?: DBRelationships;
  withDeleted?: boolean;
  orderBy?: { [key: string]: 'asc' | 'desc' };
};

export type DBUpdateParameterProps = {
  data: unknown;
  where?: KeyValueProps;
};

export type DBDeleteParameterProps = {
  where?: KeyValueProps;
};

export type DBRelationships = {
  users?: boolean;
  rules?: boolean;
  permissionGroups?: boolean;
};

export type DBFindOneRepositoryProps = {
  filter: KeyValueProps;
  relationships?: DBRelationships;
  withDeleted?: boolean;
};

export type DBAndFilterProps = { AND: KeyValueProps[] };
