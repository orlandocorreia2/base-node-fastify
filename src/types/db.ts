export type PermissionRuleProps = {
  id: string;
  rule: string;
  type: 'user' | 'permissionGroup';
  description?: string;
};

export type PermissionGroupProps = {
  id: string;
  name: string;
  description?: string;
};

export type FindManyParametersProps = {
  skip?: number;
  take?: number;
};

export type PaginateProps<T> = {
  items: T[];
  page: number;
  qtdItemsPerPage: number;
  total: number;
};
