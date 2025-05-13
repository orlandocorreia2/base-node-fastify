type generateOrderByReturnProps =
  | {
      [key: string]: 'asc' | 'desc';
    }
  | undefined;

type generateOrderByParamsProps = {
  orderBy?: string;
  orderByDirection?: string;
  tableFields: string[];
  defaultTableField: string;
};

export function generateOrderBy({
  orderBy,
  orderByDirection,
  tableFields,
  defaultTableField = 'created_at',
}: generateOrderByParamsProps): generateOrderByReturnProps {
  const orderByField =
    orderBy && tableFields.includes(orderBy) ? orderBy : defaultTableField;
  return {
    [orderByField]: orderByDirection?.toLowerCase() === 'asc' ? 'asc' : 'desc',
  } as generateOrderByReturnProps;
}
