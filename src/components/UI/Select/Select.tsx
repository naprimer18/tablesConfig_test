import UISelect, { GroupBase, Props, StylesConfig } from "react-select";

import { customStyles } from "./styles";
import styles from "./Style.module.scss";

interface SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  error?: string;
}

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  placeholder,
  options,
  error,
  onChange,
  name,
  value,
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  return (
    <div className={styles.root}>
      <UISelect
        {...props}
        value={value}
        styles={customStyles(!!error) as StylesConfig<Option, IsMulti, Group>}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        isSearchable={false}
      />
      {error && <p className={styles.errorContent}>{error}</p>}
    </div>
  );
};
