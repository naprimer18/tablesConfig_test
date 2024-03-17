import { GroupBase, StylesConfig } from "react-select";

export const customStyles = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  hasError?: boolean
): StylesConfig<Option, IsMulti, Group> => ({
  clearIndicator: (styles) => ({ ...styles }),
  indicatorSeparator: () => ({}),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: "#6f7b8d",
    rotate: state.selectProps.menuIsOpen ? "180deg" : "0deg",
    transition: "color 150ms, rotate 150ms",
    ":hover": {
      color: "#6f7b8d",
    },
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    minHeight: "unset",
    background: "#ffffff",
    border: hasError ? "1px solid #b0263d" : "1px solid #e6ecef",
    borderRadius: "4px",
    boxShadow: "none",
    ":hover": {
      border: hasError ? "1px solid #b0263d" : "1px solid #e6ecef",
    },
  }),
  placeholder: (styles, state) => ({
    ...styles,
    fontSize: "12px",
    opacity: state.selectProps.menuIsOpen ? "0" : "1",
    color: "#868a8d",
    margin: "0",
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 14,
  }),
  singleValue: (styles) => ({
    ...styles,
    margin: 0,
  }),
  input: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#000000",
    padding: 0,
    margin: 0,
  }),
  menu: (styles) => ({
    ...styles,
    background: "#ffffff",
    marginTop: 4,
    marginBottom: 4,
    border: "1px solid #E6ECEF",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
    padding: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    padding: "14px 14px 13px 14px",
    marginBottom: 1,
    position: "relative",
    background: "#ffffff",
    fontSize: "12px",
    color: state.isSelected ? "#000000" : "#868a8d",
    fontWeight: state.isSelected ? 700 : 400,
    borderRadius: 4,
    ":hover": {
      background: "#e5e5e5",
    },
    ":after": {
      content: "''",
      position: "absolute",
      bottom: -1,
      left: 14,
      width: "calc(100% - 28px)",
      height: 1,
      background: "#e6ecef",
    },
    ":last-child": {
      ":after": {
        display: "none",
      },
    },
  }),
});
