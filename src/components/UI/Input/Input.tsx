import React, { forwardRef } from "react";
import cn from "classnames/bind";

import styles from "./Input.module.scss";

const cx = cn.bind(styles);

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder: string;
  wrapperClassName?: string;
  inputClassName?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, wrapperClassName, inputClassName, error, ...props }, ref) => {
    return (
      <div
        className={cx(styles.root, wrapperClassName)}
        data-testid="input-wrapper"
      >
        <input
          ref={ref}
          placeholder={placeholder}
          {...props}
          className={cx(styles.input, inputClassName, { error })}
        />
        {error && <p className={styles.errorContent}>{error}</p>}
      </div>
    );
  }
);
