export interface GetUserProfileUseCaseInterface {
  execute(authUserId: string): Promise<any>;
}
