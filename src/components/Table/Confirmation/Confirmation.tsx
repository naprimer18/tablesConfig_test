import React, { FC } from "react";

import styles from "./Confirmation.module.scss";
import { Button } from "../../UI/Button";
import { ConfirmationProps } from "../types";

export const Confirmation: FC<ConfirmationProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <div className={styles.root}>
      <p className={styles.text}>{message}</p>
      <div className={styles.buttons}>
        <Button type="secondary" role="cancel-delete" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} role="confirm-delete">Confirm</Button>
      </div>
    </div>
  );
};
