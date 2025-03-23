import { inject, injectable } from 'tsyringe';
import { MultipartFile } from '@fastify/multipart';
import { CreateUserRequestProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { CreateUsersBatchUseCaseInterface } from './interfaces/create.users.batch.use.case.interface';
import { getRows } from '../../../utils/xlsx';
import { UnprocessableError } from '../../../error/unprocessable.error';

import { body } from '../routes/schemas/create.user.schema/body';
import { generateExpiredAtDate } from '../../../utils/date';

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
    this.validateMultipartDataForm(multipartData);
    const { value: expiredAtValue } = multipartData?.fields?.expiredAt as any;
    const users: User[] = [];
    const rows = await getRows(multipartData);
    for (let row of rows) {
      const {
        Cliente: name,
        Email: email,
        Celular: phone,
        Endereço,
        Numero,
        Complemento,
        Bairro,
        Cidade,
        Estado,
        CEP,
        País,
      } = row;
      const userAlreadyRegisteredByEmail =
        await this.userAlreadyRegistered(email);
      if (!userAlreadyRegisteredByEmail) {
        const password = await this.generatePassword(email);
        let address = `${Endereço ? `${Endereço}, ` : ''}${Numero ? `${Numero}, ` : ''}${Complemento ? `${Complemento}, ` : ''}${Bairro ? `${Bairro}, ` : ''}${Cidade ? `${Cidade}, ` : ''}${Estado ? `${Estado}, ` : ''}${País ? `${País}, ` : ''}${CEP ? `${CEP}, ` : ''}`;
        address = address.substring(0, address.length - 2);
        const validateUser = this.validateUserData({
          name: name || email,
          email,
          expiredAt: expiredAtValue,
        });
        if (validateUser) {
          const expired_at = generateExpiredAtDate(expiredAtValue);
          const user = await this._userRepository.create({
            created_by_id: createdById,
            name: name || email,
            email,
            password,
            expired_at,
            phone,
            address,
          });
          users.push(user);
        }
      }
    }
    return users;
  }

  private validateMultipartDataForm(multipartData: MultipartFile) {
    if (
      !multipartData ||
      multipartData.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      throw new UnprocessableError(
        'Arquivo com extensão .xlsx não encontrado ou inválido!',
      );
    }
    const expiredAt = multipartData?.fields?.expiredAt as any;
    if (!expiredAt || !expiredAt.value) {
      throw new UnprocessableError('O campo expiredAt é obrigatório!');
    }
  }

  private validateUserData(user: CreateUserRequestProps): boolean {
    return body.safeParse(user).success;
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
