import { RowType, TableHeaderProps } from "../types";

export const HeaderRow = <T extends RowType>({
  columns,
  editable,
}: TableHeaderProps<T>) => {
  return (
    <tr>
      {columns.map((item) => {
        return <th key={item.key}>{item.title ?? null}</th>;
      })}
      {editable && <th />}
    </tr>
  );
};
