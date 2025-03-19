import { inject, injectable } from 'tsyringe';
import { MultipartFile } from '@fastify/multipart';
import { User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { CreateUsersBatchUseCaseInterface } from './interfaces/create.users.batch.use.case.interface';
import { getRows } from '../../../utils/xlsx';

@injectable()
export class CreateUsersBatchUseCase
  implements CreateUsersBatchUseCaseInterface
{
  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<User[]> {
    const users: User[] = [];
    const rows = await getRows(multipartData);
    for (let row of rows) {
      const { Cliente: name, Email: email, Celular: phone } = row;
      const userAlreadyRegisteredByEmail =
        await this.userAlreadyRegistered(email);
      if (!userAlreadyRegisteredByEmail) {
        const password = await this.generatePassword(email);
        const { value: expiredAtValue } = multipartData?.fields
          ?.expiredAt as any;
        const user = await this._userRepository.create({
          created_by_id: createdById,
          name,
          email,
          password,
          expired_at: new Date(expiredAtValue),
          phone,
        });
        users.push(user);
      }
    }
    return users;
  }

  private async userAlreadyRegistered(email: string) {
    return await this._userRepository.findOne({
      filter: { email },
      withDeleted: true,
    });
  }

  private async generatePassword(email: string) {
    const password = email.split('@')[0];
    return await generateHash(password);
  }
}
