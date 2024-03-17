import { FC, ForwardedRef, ReactNode, forwardRef, MouseEvent } from "react";
import cn from "classnames/bind";

import styles from "./BaseButton.module.scss";

const cx = cn.bind(styles);

type ButtonType = "primary" | "secondary";

export interface ButtonProps {
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  role?: string;
}

export const Button: FC<ButtonProps> = forwardRef(
  (
    { disabled, children, onClick, className, type = "primary", role = 'button' },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    };

    return (
      <button
        className={cx(styles.root, className, type)}
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        role={role}
      >
        {children}
      </button>
    );
  }
);
