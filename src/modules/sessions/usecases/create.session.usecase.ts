import { inject, injectable } from 'tsyringe';
import { CreateSessionUseCaseInterface } from './interfaces/create.session.usecase.interface';
import { AuthToken, AuthUser } from '../DTOs/session';
import { UnauthorizedError } from '../../../error/unauthorized.error';
import { verifyHash } from '../../../utils/hash';
import { app } from '../../../app';
import { User } from '../../users/DTOs/user';
import { UserRepositoryInterface } from '../../users/repositories/interfaces/user.repository.interface';

@injectable()
export class CreateSessionUseCase implements CreateSessionUseCaseInterface {
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute(authUser: AuthUser): Promise<AuthToken> {
    const { email, password } = authUser;
    const user = await this._userRepository.findOne({
      filter: { email },
      relationships: { rules: true },
    });
    if (!user || user.expired_at < new Date()) {
      throw new UnauthorizedError();
    }
    const isPassword = await verifyHash(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedError();
    }
    const userInfoToken = this.generateUserInfoToken(user);
    const token = app.jwt.sign(userInfoToken, { expiresIn: '1h' });
    return { token };
  }

  private generateUserInfoToken(user: User) {
    const permissionGroups: { id: string; name: string }[] = [];
    const permissionRules: { id: string; rule: string }[] = [];
    user.permissionGroups?.forEach(permissionGroupItem => {
      permissionGroups.push({
        id: permissionGroupItem.permissionGroup.id,
        name: permissionGroupItem.permissionGroup.name,
      });
      permissionGroupItem.permissionGroup.rules?.forEach(permissionRuleItem => {
        permissionRules.push({
          id: permissionRuleItem.permissionRule.id,
          rule: permissionRuleItem.permissionRule.rule,
        });
      });
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      expiredAt: user.expired_at,
      phone: user.phone,
      address: user.address,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      permissionGroups,
      permissionRules,
    };
  }
}
