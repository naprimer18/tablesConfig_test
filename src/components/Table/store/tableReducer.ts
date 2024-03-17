import { v4 as uuidv4 } from "uuid";
import { TableAction, RowType } from "../types";
import { TABLE_ACTIONS } from "../consts";

export const reducer = <T extends RowType>(
  state: T[],
  action: TableAction<T>
): T[] => {
  switch (action.type) {
    case TABLE_ACTIONS.EDIT:
      return state.map((row) => {
        if (row.id === action.payload.id) {
          return {
            ...row,
            ...action.payload,
          };
        }
        return row;
      });
    case TABLE_ACTIONS.DELETE:
      return state.filter((row) => row.id !== action.payload.id);
    case TABLE_ACTIONS.ADD:
      return [...state, { ...action.payload, id: uuidv4() }];
    default:
      return state;
  }
};
