import { render, screen } from "@testing-library/react";
import { TableController } from "../TableController";
import { RowType, TableProps } from "../types";

describe("TableController component", () => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "City", dataIndex: "city", key: "city" },
  ];

  const rows = [
    { id: "1", name: "John", age: 30, city: "New York" },
    { id: "2", name: "Alice", age: 25, city: "Los Angeles" },
  ];

  const props = { columns, data: rows };

  it("renders Table component with correct props", () => {
    render(<TableController {...(props as TableProps<RowType>)} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Check if columns are passed correctly
    const columnHeaderNames = columns.map((column) => column.title);
    columnHeaderNames.forEach((columnTitle) => {
      expect(screen.getByText(columnTitle)).toBeInTheDocument();
    });

    // Check if data rows are rendered correctly
    rows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
      expect(screen.getByText(row.city)).toBeInTheDocument();
    });
  });
});
