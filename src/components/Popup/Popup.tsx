import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import useOnclickOutside from "react-cool-onclickoutside";

import { Overlay } from "../Overlay";

import styles from "./Popup.module.scss";

interface PopupProps {
  isOpened: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export const Popup: FC<PopupProps> = ({ isOpened, children, onClose }) => {
  const ref = useOnclickOutside(() => {
    handleCloseModal();
  });

  const handleCloseModal = () => {
    onClose?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <>
      <Overlay isVisible={isOpened} />
      {createPortal(
        <AnimatePresence>
          {isOpened && (
            <motion.div
              data-testid="popup-container"
              role="dialog"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
              ref={ref}
              className={styles.root}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
            >
              <button className={styles.button} onClick={handleCloseModal}>
                <div className={styles.icon}>
                  <span></span>
                  <span></span>
                </div>
              </button>
              <span className={styles.content}>{children}</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
