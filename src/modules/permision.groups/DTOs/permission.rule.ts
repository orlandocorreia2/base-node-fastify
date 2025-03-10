export type PermissionRuleProps = {
  id: string;
  rule: string;
  type: 'user' | 'permissionGroup';
  description?: string;
};

export type PermissionRule = {
  id: string;
  rule: string;
  type: PermissionRuleProps['type'];
  description?: string;
};
