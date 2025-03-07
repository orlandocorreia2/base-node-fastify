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
