import { TABLE_ACTIONS } from "../consts";

export const editTableAction = <T>(payload: T) => ({
  type: TABLE_ACTIONS.EDIT,
  payload,
});

export const deleteTableRow = <T>(payload: T) => ({
  type: TABLE_ACTIONS.DELETE,
  payload,
});

export const addTableRow = <T>(payload: T) => ({
  type: TABLE_ACTIONS.ADD,
  payload,
});
