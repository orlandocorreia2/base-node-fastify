import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { GetUserProfileUseCaseInterface } from '../usecases/interfaces/get.user.profile.use.case.interface';
import { UserProfileResponse } from './responses/user.profile.response';

@injectable()
export class UserProfileController {
  constructor(
    @inject('GetUserProfileUseCase')
    private _getUserProfileUseCaseInterface: GetUserProfileUseCaseInterface,
  ) {}

  async findOne(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const authUserId = request.user.id;
      const result =
        await this._getUserProfileUseCaseInterface.execute(authUserId);
      return UserProfileResponse.success({ result, reply });
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
