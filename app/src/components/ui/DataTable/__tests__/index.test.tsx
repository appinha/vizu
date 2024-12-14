import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";

import DataTable from "@/components/ui/DataTable";

type ExampleData = { value: number; description: string };

const dataMock: ExampleData[] = [
  { value: 81.5, description: "Mia Pizzaria" },
  { value: 288, description: "Risoteria Villa Lobos" },
];
const columns: ColumnDef<ExampleData>[] = [
  { header: "Valor", accessorKey: "value" },
  { header: "Description", accessorKey: "description" },
];
const onClick = vi.fn();

function DataTableWithProviders({ data }: { data: ExampleData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} onClick={onClick} />;
}

describe("DataTable", () => {
  it("renders properly", () => {
    render(<DataTableWithProviders data={dataMock} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);

    expect(
      screen.getByRole("columnheader", { name: "Valor" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Description" }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("cell")).toHaveLength(4);
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("81.5");
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent("Mia Pizzaria");
    expect(screen.getAllByRole("cell")[2]).toHaveTextContent("288");
    expect(screen.getAllByRole("cell")[3]).toHaveTextContent(
      "Risoteria Villa Lobos",
    );
  });

  it("renders properly when data is empty", () => {
    render(<DataTableWithProviders data={[]} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2);

    expect(
      screen.getByRole("columnheader", { name: "Valor" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Description" }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("cell")).toHaveLength(1);
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("No results.");
  });

  it("on row click, triggers callback", () => {
    render(<DataTableWithProviders data={dataMock} />);

    fireEvent.click(screen.getByText("Mia Pizzaria"));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(dataMock[0]);
  });
});
