import {
  useForm,
  SubmitHandler,
  UseFormProps,
  Controller,
  Path,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Select } from "../../UI/Select";

import { RowType, TableFormProps } from "../types";

import styles from "./TableForm.module.scss";

export const TableForm = <T extends RowType>({
  columns,
  validationSchema,
  defaultValues,
  onSubmit,
  buttonText,
}: TableFormProps<T>) => {
  const options: UseFormProps<T> = {
    mode: "onChange",
    defaultValues: defaultValues,
  };

  if (validationSchema) {
    options.resolver = yupResolver(validationSchema);
  }

  if (defaultValues) {
    options.defaultValues = defaultValues;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<T>(options);
  const handleFormSubmit: SubmitHandler<T> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      {columns.map((column) => {
        return column.options ? (
          <Controller
            key={column.key}
            control={control}
            name={column.dataIndex as unknown as Path<T>}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  placeholder={column.title}
                  onChange={(option) => {
                    return onChange(option?.value);
                  }}
                  value={value ? { value, label: value } : undefined}
                  options={column.options}
                />
              );
            }}
          />
        ) : (
          <Input
            key={column.key}
            {...register(column.dataIndex as unknown as Path<T>)}
            placeholder={column.title ?? ""}
            error={errors[column.dataIndex as string]?.message as string}
          />
        );
      })}
      <Button className={styles.submitButton} disabled={!isValid}>
        {buttonText}
      </Button>
    </form>
  );
};
