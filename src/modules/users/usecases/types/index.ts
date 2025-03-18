import { DBRelationships } from '../../../../types/db';

export type FindOneUserUseCaseExecuteProps = {
  id: string;
  relationships?: DBRelationships;
};
