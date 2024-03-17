import { FC } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Overlay.module.scss";

interface OverlayProps {
  isVisible: boolean;
}

export const Overlay: FC<OverlayProps> = ({ isVisible }) => {
  const animatedOverlay = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-testid="animated-overlay"
          className={styles.root}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );

  return typeof window !== "undefined" ? (
    <>{createPortal(animatedOverlay, document.body)}</>
  ) : null;
};
