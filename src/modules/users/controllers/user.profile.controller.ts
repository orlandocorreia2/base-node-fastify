import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FastifyAuthRequest } from '../../../types/types';
import { FindOneUserResponse } from './responses/find.one.user.response';
import { GetUserProfileUseCaseInterface } from '../usecases/interfaces/get.user.profile.use.case.interface';
import { GetUserProfileResponse } from './responses/get.user.profile.response';

@injectable()
export class UserProfileController {
  constructor(
    @inject('GetUserProfileUseCase')
    private _getUserProfileUseCase: GetUserProfileUseCaseInterface,
  ) {}

  async findOne(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const result = await this._getUserProfileUseCase.execute(request.user.id);
      return GetUserProfileResponse.success({ result, reply });
    } catch (error) {
      FindOneUserResponse.error(error);
    }
  }
}
