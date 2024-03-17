import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  surname: yup.string().min(2).required(),
  age: yup
    .number()
    .moreThan(17)
    .lessThan(101)
    .required()
    .typeError("age must be a 'number' type"),
  city: yup.string().required(),
});
