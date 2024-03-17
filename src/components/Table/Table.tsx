import { useCallback, useMemo, useReducer, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 } from "uuid";

import { HeaderRow } from "./HeaderRow/HeaderRow";
import { TableRow } from "./TableRow/TableRow";
import { Button } from "../UI/Button";
import { TableForm } from "./TableForm";
import { Popup } from "../Popup";

import {
  addTableRow,
  deleteTableRow,
  editTableAction,
} from "./store/tableActions";
import { reducer } from "./store/tableReducer";

import { ModalMode, RowType, TableProps, TableReducer } from "./types";

import styles from "./Table.module.scss";
import { Confirmation } from "./Confirmation";
import { FORM_ACTIONS, TABLE_ACTIONS } from "./consts";

export const Table = <T extends RowType>({
  data,
  columns,
  canEditRows = false,
  validationSchema,
  parentTable,
  onCopyTable,
  onDeleteTable,
  id,
}: TableProps<T>) => {
  const [isOpened, setIsOpened] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [state, dispatch] = useReducer<TableReducer<T>, T[]>(
    reducer,
    data,
    (data) => data.map((item) => ({ ...item, id: v4() }))
  );

  const handleOpenModal = useCallback((mode?: ModalMode): void => {
    setModalMode(mode ?? null);
    setIsOpened(true);
  }, []);

  const handleRowEdit = useCallback((row: T): void => {
    dispatch(editTableAction(row));
  }, []);

  const handleRowDelete = useCallback((row: T): void => {
    dispatch(deleteTableRow(row));
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsOpened(false);
  }, []);

  const handleRowAdd = useCallback(
    (row: T): void => {
      dispatch(addTableRow(row));
      handleCloseModal();
    },
    [handleCloseModal]
  );

  const deleteTable = useCallback((): void => {
    id && onDeleteTable?.(id);
    handleCloseModal();
  }, [handleCloseModal, id, onDeleteTable]);

  const copyTable = useCallback((): void => {
    onCopyTable?.(state);
  }, [onCopyTable, state]);

  const modalContent = useMemo(() => {
    switch (modalMode) {
      case TABLE_ACTIONS.ADD:
        return (
          <TableForm
            buttonText={FORM_ACTIONS.ADD}
            columns={columns}
            validationSchema={validationSchema}
            onSubmit={handleRowAdd}
          />
        );
      case TABLE_ACTIONS.DELETE:
        return (
          <Confirmation
            message={"Are you sure you want to delete this table?"}
            onConfirm={deleteTable}
            onCancel={handleCloseModal}
          />
        );
      default:
        return;
    }
  }, [
    columns,
    deleteTable,
    handleCloseModal,
    handleRowAdd,
    modalMode,
    validationSchema,
  ]);

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <div className={styles.controlButtons}>
        {parentTable && (
          <Button
            onClick={() => handleOpenModal(TABLE_ACTIONS.ADD)}
            role="add-row"
          >
            Add Row
          </Button>
        )}
        {parentTable ? (
          <Button onClick={copyTable} role="copy-table">
            Copy Table
          </Button>
        ) : (
          <Button
            onClick={() => handleOpenModal(TABLE_ACTIONS.DELETE)}
            role="delete-table"
            className={styles.remove}
            type="secondary"
          >
            <span />
            <span />
          </Button>
        )}
      </div>

      <Popup isOpened={isOpened} onClose={handleCloseModal}>
        {modalContent}
      </Popup>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <HeaderRow columns={columns} editable={canEditRows} />
          </thead>
          <tbody>
            <AnimatePresence>
              {state.map((row) => {
                return (
                  <TableRow
                    columns={columns}
                    rowData={row}
                    key={row.id}
                    rowId={row.id.toString()}
                    editable={canEditRows}
                    onRowEdit={handleRowEdit}
                    onRowDelete={handleRowDelete}
                    validationSchema={validationSchema}
                  />
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
