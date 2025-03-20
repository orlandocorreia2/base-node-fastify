import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type PaginateRequestProps = {
  page: number;
  qtdItemsPerPage: number;
  filter?: string;
};

export type ParamRequestProps = {
  id: string;
};

export type KeyValueProps = {
  [key: string]: unknown;
};

export interface FastifyAuthRequest extends FastifyRequest {
  user: {
    id: string;
    name: string;
  };
}
