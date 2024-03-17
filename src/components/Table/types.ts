import { ReactNode } from "react";
import { DefaultValues, Path, PathValue } from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { RecursiveKeyOf } from "../../utils/getRecursiveValue/types";
import { FORM_ACTIONS, TABLE_ACTIONS } from "./consts";

export type ModalMode = TABLE_ACTIONS | null;
export type RowType = Record<string, any>;

export interface SelectOption<T> {
  value: NonNullable<PathValue<T, Path<T>>>;
  label: NonNullable<PathValue<T, Path<T>>>;
}

export interface ConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export interface TableColumn<T extends RowType> {
  dataIndex: RecursiveKeyOf<T>;
  key: string | number;
  title?: string;
  render?: (column: TableColumn<T>, item: T) => ReactNode;
  editor?: (column: TableColumn<T>, item: T) => T[string];
  options?: SelectOption<T>[];
}

export interface TableFormProps<T extends RowType> {
  columns: TableColumn<T>[];
  validationSchema?: AnyObjectSchema;
  buttonText: FORM_ACTIONS;
  onSubmit: (row: T) => void;
  defaultValues?: DefaultValues<T>;
}

export interface TableProps<T extends RowType> {
  id?: string;
  parentTable?: boolean;
  columns: TableColumn<T>[];
  data: T[];
  canEditRows?: boolean;
  validationSchema?: AnyObjectSchema;
  onCopyTable?: (data: T[]) => void;
  onDeleteTable?: (id: string) => void;
}

export interface TableHeaderProps<T extends RowType> {
  columns: TableColumn<T>[];
  editable?: boolean;
}

export interface TableRowProps<T extends RowType> {
  rowId: string;
  rowData: T;
  columns: TableColumn<T>[];
  editable?: boolean;
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
  validationSchema?: AnyObjectSchema;
}

export interface TableCellProps<T extends RowType> {
  row: T;
  column: TableColumn<T>;
}

export type TableReducer<S> = (prevState: S[], action: TableAction<S>) => S[];

export type TableAction<T> = {
  type: TABLE_ACTIONS;
  payload: T;
};
