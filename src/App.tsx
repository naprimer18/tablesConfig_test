import { TableController } from "./components/Table";
import { columns, rows } from "./mock/parentTable";
import { validationSchema } from "./schemas/form";

export const App = () => {
  return (
    <main>
      <TableController
        validationSchema={validationSchema}
        columns={columns}
        data={rows}
        canEditRows
      />
    </main>
  );
};
