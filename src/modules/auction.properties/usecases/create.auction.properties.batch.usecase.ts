import { MultipartFile } from '@fastify/multipart';
import { injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { getRows } from '../../../utils/xlsx';
import { AuctionProperty } from '../DTOs/auction.properties';
import { CreateAuctionPropertiesBatchUseCaseInterface } from './interfaces/create.auction.properties.batch.usecase.interface';

@injectable()
export class CreateAuctionPropertiesBatchUseCase
  implements CreateAuctionPropertiesBatchUseCaseInterface
{
  public async execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<AuctionProperty[]> {
    this.validateMultipartDataForm(multipartData);
    let rowNumber = 0;
    const rows = await getRows(multipartData);
    for (let row of rows) {
      rowNumber++;
      console.log('>>>>>>>', {
        row,
        createdById,
      });
      // const {
      //   Cliente: name,
      //   Email: email,
      //   Celular: phone,
      //   Endereço,
      //   Numero,
      //   Complemento,
      //   Bairro,
      //   Cidade,
      //   Estado,
      //   CEP,
      //   País,
      // } = row;
      // const validateUser = this.validateUserData({
      //   name: name || email,
      //   email,
      //   expiredAt: expiredAtValue,
      // });
      // if (!validateUser) {
      //   this._returnMessages.totalNotRegisteredUsers++;
      //   this._returnMessages.notRegisteredUsers.push(
      //     `Erro na linha: ${rowNumber}. Usuário(a): com nome: ${name} e email: ${email} não cadastrado devido a falha de validação.`,
      //   );
      // }
      // if (validateUser) {
      //   await this.createOrUpdateUser({
      //     Endereço,
      //     Numero,
      //     Complemento,
      //     Bairro,
      //     Cidade,
      //     Estado,
      //     País,
      //     CEP,
      //     expiredAtValue,
      //     email,
      //     name: name || email,
      //     phone,
      //     createdById,
      //   });
      // }
    }

    return [];
  }

  private validateMultipartDataForm(multipartData: MultipartFile) {
    if (!multipartData || multipartData.mimetype !== 'text/csv') {
      throw new UnprocessableError(
        'Arquivo com extensão .csv não encontrado ou inválido!',
      );
    }
  }

  // private validateUserData(user: CreateUserRequestProps): boolean {
  //   return body.safeParse(user).success;
  // }

  // private async createOrUpdateUser({
  //   Endereço,
  //   Numero,
  //   Complemento,
  //   Bairro,
  //   Cidade,
  //   Estado,
  //   País,
  //   CEP,
  //   expiredAtValue,
  //   email,
  //   name,
  //   phone,
  //   createdById,
  // }: UserCreateOrUpdateBatchProps) {
  //   let user: User = {} as User;
  //   let link: string = '';
  //   let address = `${Endereço ? `${Endereço}, ` : ''}${Numero ? `${Numero}, ` : ''}${Complemento ? `${Complemento}, ` : ''}${Bairro ? `${Bairro}, ` : ''}${Cidade ? `${Cidade}, ` : ''}${Estado ? `${Estado}, ` : ''}${País ? `${País}, ` : ''}${CEP ? `${CEP}, ` : ''}`;
  //   const expired_at = generateExpiredAtDate(expiredAtValue);
  //   const userAlreadyRegistered = await this._userRepository.findOne({
  //     filter: { email },
  //     withDeleted: true,
  //   });
  //   const isActive = userAlreadyRegistered && !userAlreadyRegistered.deleted_at;
  //   if (userAlreadyRegistered) {
  //     user = await this._userRepository.update({
  //       id: userAlreadyRegistered.id,
  //       name,
  //       email,
  //       expired_at,
  //       phone,
  //       address,
  //       deleted_at: null,
  //     });
  //     this._returnMessages.totalRenewalUsers++;
  //     link = await this.generateEmailLink({ user, isActive });
  //     this._renewalUserMail.send({ name, email, link });
  //     return;
  //   }
  //   const password = await this.generatePassword();
  //   user = await this._userRepository.create({
  //     created_by_id: createdById,
  //     name,
  //     email,
  //     password,
  //     expired_at,
  //     phone,
  //     address,
  //   });
  //   this._returnMessages.totalRegisteredUsers++;
  //   link = await this.generateEmailLink({ user, isActive });
  //   this._createUserMail.send({ name, email, link });
  // }
}
