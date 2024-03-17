
import { getRecursiveValue } from "../../../utils";
import { TableCellProps, RowType } from "../types";

export const TableCell = <T extends RowType>({
  column,
  row,
}: TableCellProps<T>) => {
  const content = column.render
    ? column.render(column, row)
    : getRecursiveValue(row, column.dataIndex);

  return <td>{content}</td>;
};
