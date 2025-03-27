import { inject, injectable } from 'tsyringe';
import { randomBytes } from 'crypto';
import { MultipartFile } from '@fastify/multipart';
import { CreateUserRequestProps, User } from '../DTOs/user';
import { generateHash } from '../../../utils/hash';
import { UserRepositoryInterface } from '../repositories/interfaces/user.repository.interface';
import { CreateUsersBatchUseCaseInterface } from './interfaces/create.users.batch.use.case.interface';
import { getRows } from '../../../utils/xlsx';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { body } from '../routes/schemas/create.user.schema/body';
import { generateExpiredAtDate } from '../../../utils/date';
import { env } from '../../../utils/env';
import {
  UserCreateBatchMessagesProps,
  UserCreateOrUpdateBatchProps,
} from './types';
import { app } from '../../../app';
import { TokenRepositoryInterface } from '../../../shared/interfaces/token.repository.interface';
import { MailInterface } from '../../../shared/email/mail.interface';

@injectable()
export class CreateUsersBatchUseCase
  implements CreateUsersBatchUseCaseInterface
{
  private _returnMessages: UserCreateBatchMessagesProps =
    {} as UserCreateBatchMessagesProps;

  constructor(
    @inject('UserRepository') private _userRepository: UserRepositoryInterface,
    @inject('TokenRepository')
    private _tokenRepository: TokenRepositoryInterface,
    @inject('CreateUserMail')
    private _createUserMail: MailInterface,
    @inject('RenewalUserMail')
    private _renewalUserMail: MailInterface,
  ) {}

  public async execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<UserCreateBatchMessagesProps> {
    this._returnMessages = {
      totalRegisteredUsers: 0,
      totalRenewalUsers: 0,
      totalNotRegisteredUsers: 0,
      notRegisteredUsers: [],
    };
    this.validateMultipartDataForm(multipartData);
    const { value: expiredAtValue } = multipartData?.fields?.expiredAt as any;
    let rowNumber = 0;
    const rows = await getRows(multipartData);
    for (let row of rows) {
      rowNumber++;
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
      const validateUser = this.validateUserData({
        name: name || email,
        email,
        expiredAt: expiredAtValue,
      });
      if (!validateUser) {
        this._returnMessages.totalNotRegisteredUsers++;
        this._returnMessages.notRegisteredUsers.push(
          `Erro na linha: ${rowNumber}. Usuário(a): com nome: ${name} e email: ${email} não cadastrado devido a falha de validação.`,
        );
      }
      if (validateUser) {
        await this.createOrUpdateUser({
          Endereço,
          Numero,
          Complemento,
          Bairro,
          Cidade,
          Estado,
          País,
          CEP,
          expiredAtValue,
          email,
          name: name || email,
          phone,
          createdById,
        });
      }
    }
    return this._returnMessages;
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

  private async createOrUpdateUser({
    Endereço,
    Numero,
    Complemento,
    Bairro,
    Cidade,
    Estado,
    País,
    CEP,
    expiredAtValue,
    email,
    name,
    phone,
    createdById,
  }: UserCreateOrUpdateBatchProps) {
    let user: User = {} as User;
    let link: string = '';
    let address = `${Endereço ? `${Endereço}, ` : ''}${Numero ? `${Numero}, ` : ''}${Complemento ? `${Complemento}, ` : ''}${Bairro ? `${Bairro}, ` : ''}${Cidade ? `${Cidade}, ` : ''}${Estado ? `${Estado}, ` : ''}${País ? `${País}, ` : ''}${CEP ? `${CEP}, ` : ''}`;
    const expired_at = generateExpiredAtDate(expiredAtValue);
    const userAlreadyRegistered = await this._userRepository.findOne({
      filter: { email },
      withDeleted: true,
    });
    const isActive = userAlreadyRegistered && !userAlreadyRegistered.deleted_at;
    if (userAlreadyRegistered) {
      user = await this._userRepository.update({
        id: userAlreadyRegistered.id,
        name,
        email,
        expired_at,
        phone,
        address,
        deleted_at: null,
      });
      this._returnMessages.totalRenewalUsers++;
      link = await this.generateEmailLink({ user, isActive });
      this._renewalUserMail.send({ name, email, link });
      return;
    }
    const password = await this.generatePassword();
    user = await this._userRepository.create({
      created_by_id: createdById,
      name,
      email,
      password,
      expired_at,
      phone,
      address,
    });
    this._returnMessages.totalRegisteredUsers++;
    link = await this.generateEmailLink({ user, isActive });
    this._createUserMail.send({ name, email, link });
  }

  private async generatePassword() {
    const password = randomBytes(8).toString('base64url');
    return await generateHash(password);
  }

  private async generateEmailLink({
    user,
    isActive,
  }: {
    user: User;
    isActive: boolean;
  }) {
    if (isActive) return `${env({ key: 'FRONT_URL' })}`;
    const jwt = app.jwt.sign(user, { expiresIn: '24h' });
    const { token } = await this._tokenRepository.create(jwt);
    return `${env({ key: 'FRONT_URL' })}/reset-password/${token}`;
  }
}
