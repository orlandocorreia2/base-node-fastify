import { PermissionRuleProps } from '@/types/db';

export interface PermissionRule {
  id: string;
  rule: string;
  type: PermissionRuleProps['type'];
  description?: string;
}
