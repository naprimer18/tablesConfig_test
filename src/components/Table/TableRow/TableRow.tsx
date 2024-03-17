import { ReactElement, useCallback, useMemo, useState } from "react";

import { Button } from "../../UI/Button";
import { Popup } from "../../Popup";
import { TableCell } from "../TableCell/TableCell";
import { TableForm } from "../TableForm/TableForm";

import { ModalMode, RowType, TableRowProps } from "../types";

import styles from "./TableRow.module.scss";
import { DefaultValues } from "react-hook-form";
import { Confirmation } from "../Confirmation";
import { motion } from "framer-motion";
import { FORM_ACTIONS, TABLE_ACTIONS } from "../consts";

export const TableRow = <T extends RowType>({
  columns,
  rowData,
  rowId,
  editable,
  onRowDelete,
  onRowEdit,
  validationSchema,
}: TableRowProps<T>) => {
  const [isOpened, setIsOpened] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const handleOpenModal = useCallback((mode?: ModalMode): void => {
    setModalMode(mode ?? null);
    setIsOpened(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsOpened(false);
  }, []);

  const handleRowEdit = useCallback(
    (data: T): void => {
      onRowEdit?.(data);
      handleCloseModal();
    },
    [handleCloseModal, onRowEdit]
  );

  const handleRowDelete = useCallback(
    (data: T): void => {
      onRowDelete?.(data);
      handleCloseModal();
    },
    [handleCloseModal, onRowDelete]
  );

  const modalContent = useMemo((): ReactElement | null => {
    switch (modalMode) {
      case TABLE_ACTIONS.EDIT:
        return (
          <TableForm
            buttonText={FORM_ACTIONS.SAVE}
            columns={columns}
            validationSchema={validationSchema}
            defaultValues={rowData as DefaultValues<T>}
            onSubmit={handleRowEdit}
          />
        );
      case TABLE_ACTIONS.DELETE:
        return (
          <Confirmation
            message={"Are you sure you want to delete this row?"}
            onConfirm={() => handleRowDelete(rowData)}
            onCancel={handleCloseModal}
          />
        );
      default:
        return null;
    }
  }, [
    columns,
    handleCloseModal,
    handleRowDelete,
    handleRowEdit,
    modalMode,
    rowData,
    validationSchema,
  ]);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        layout
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        {columns.map((col) => {
          return (
            <TableCell key={`${rowId}-${col.key}`} column={col} row={rowData} />
          );
        })}
        {editable && (
          <td className={styles.buttons}>
            <Button
              type="secondary"
              onClick={() => handleOpenModal(TABLE_ACTIONS.EDIT)}
            >
              Edit
            </Button>
            <Button
              type="secondary"
              onClick={() => handleOpenModal(TABLE_ACTIONS.DELETE)}
            >
              Delete
            </Button>
          </td>
        )}
      </motion.tr>

      <Popup isOpened={isOpened} onClose={handleCloseModal}>
        {modalContent}
      </Popup>
    </>
  );
};
