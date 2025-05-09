import { DBRelationships } from '../../../../types/db';

export type FindOneUserUseCaseExecuteProps = {
  id: string;
  relationships?: DBRelationships;
};

export type UserCreateBatchMessagesProps = {
  totalRegisteredUsers: number;
  totalRenewalUsers: number;
  totalNotRegisteredUsers: number;
  notRegisteredUsers: string[];
};

export type UserCreateOrUpdateBatchProps = {
  Endereço: string;
  Numero: string;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  País: string;
  CEP: string;
  expiredAtValue: string;
  email: string;
  name: string;
  phone: string;
  createdById: string;
};
