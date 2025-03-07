export interface PermissionRule {
  id: string;
  rule: string;
  type: 'user' | 'permissionGroup';
  description?: string;
}
