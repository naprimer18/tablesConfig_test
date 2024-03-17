import { render, screen } from "@testing-library/react";
import { HeaderRow } from "../HeaderRow";

describe("HeaderRow component", () => {
  const columns = [
    { title: "Name", key: "name", dataIndex: "1" },
    { title: "Age", key: "age", dataIndex: "2" },
    { title: "City", key: "city", dataIndex: "3" },
  ];

  it("renders column headers correctly", () => {
    render(<HeaderRow columns={columns} />);
    const nameColumnHeader = screen.getByText("Name");
    const ageColumnHeader = screen.getByText("Age");
    const cityColumnHeader = screen.getByText("City");
    expect(nameColumnHeader).toBeInTheDocument();
    expect(ageColumnHeader).toBeInTheDocument();
    expect(cityColumnHeader).toBeInTheDocument();
  });
});
