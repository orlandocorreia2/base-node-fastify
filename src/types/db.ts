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
  where?: KeyValueProps;
  page: number;
  qtdItemsPerPage: number;
  relationships?: DBRelationships;
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

export type DBFindOneUserRepositoryProps = {
  filter: KeyValueProps;
  relationships?: DBRelationships;
};
