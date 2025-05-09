export interface DeletePermissionGroupUseCaseInterface {
  execute(id?: string): Promise<void>;
}
