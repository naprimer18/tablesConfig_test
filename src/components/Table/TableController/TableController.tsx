import { useCallback, useState } from "react";
import { v4 } from "uuid";

import { Table } from "../Table";

import { RowType, TableProps } from "../types";

import styles from "./TableController.module.scss";
import { AnimatePresence } from "framer-motion";

export const TableController = <T extends RowType>(props: TableProps<T>) => {
  const handleDeleteTable = useCallback((id: string): void => {
    setTables((state) =>
      state.filter((table) => {
        return table.props.id !== id;
      })
    );
  }, []);

  const handleCopyTable = useCallback((data: T[]): void => {
    const id = v4();

    const tableProps = {
      ...props,
      id,
      data,
      onDeleteTable: handleDeleteTable,
    };
    setTables((state) => [...state, <Table {...tableProps} key={id} />]);
  }, [handleDeleteTable, props]);


  const [tables, setTables] = useState(() => [
    <Table
      {...props}
      key={"parentTable"}
      id={v4()}
      parentTable
      onCopyTable={handleCopyTable}
      onDeleteTable={handleDeleteTable}
    />,
  ]);

  return (
    <div className={styles.root}>
      <AnimatePresence>{tables.map((table) => table)}</AnimatePresence>
    </div>
  );
};
