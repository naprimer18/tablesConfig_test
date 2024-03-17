import { TableColumn } from "../components/Table/types";

export const rows = [
    {
      id: 1,
      name: "NAME",
      surname: "SURNAME",
      age: 32,
      city: "Daugavpils",
    },
    {
      id: 2,
      name: "NAME",
      surname: "SURNAME",
      age: 43,
      city: "Daugavpils",
    },
    {
      id: 3,
      name: "NAME",
      surname: "SURNAME",
      age: 32,
      city: "Daugavpils",
    },
];
  
export const columns: TableColumn<(typeof rows)[number]>[] = [
    { title: "Name", dataIndex: "name", key: "123" },
    { title: "Surname", dataIndex: "surname", key: "234" },
    { title: "Age", dataIndex: "age", key: "345" },
    {
      title: "City",
      dataIndex: "city",
      key: "456",
      options: [
        { value: "Riga", label: "Riga" },
        { value: "Daugavpils", label: "Daugavpils" },
        { value: "Jūrmala", label: "Jūrmala" },
        { value: "Ventspils", label: "Ventspils" },
      ],
    },
];
  