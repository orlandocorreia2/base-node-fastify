import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { AuthRequestProps, FastifyAuthRequest } from '../../../types/types';
import { GetUserProfileUseCaseInterface } from '../usecases/interfaces/get.user.profile.use.case.interface';
import { GetUserProfileResponse } from './responses/get.user.profile.response';
import { UpdateUserProfileUseCaseInterface } from '../usecases/interfaces/update.user.profile.use.case.interface';
import { UpdateUserProfileRequestProps } from '../DTOs/user';
import { UpdateUserProfileResponse } from './responses/update.user.profile.response';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class UserProfileController {
  constructor(
    @inject('GetUserProfileUseCase')
    private readonly _getUserProfileUseCase: GetUserProfileUseCaseInterface,
    @inject('UpdateUserProfileUseCase')
    private readonly _updateUserProfileUseCase: UpdateUserProfileUseCaseInterface,
  ) {}

  async findOne(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const result = await this._getUserProfileUseCase.execute(request.user.id);
      return GetUserProfileResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async update(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const { id } = request.user as AuthRequestProps;
      const { name, password, phone, address } =
        request.body as UpdateUserProfileRequestProps;
      const result = await this._updateUserProfileUseCase.execute({
        id,
        name,
        password,
        phone,
        address,
      });
      return UpdateUserProfileResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
