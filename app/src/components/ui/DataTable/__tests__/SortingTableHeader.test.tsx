import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";

import SortingTableHeader from "@/components/ui/DataTable/SortingTableHeader";

type ExampleData = { name: string };

const data = [{ name: "Anne" }];
const columns: ColumnDef<ExampleData>[] = [
  { header: "Name", accessorKey: "name" },
];
const title = "Name";

function SortingTableHeaderWithProviders() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const column = table.getAllColumns()[0];

  return <SortingTableHeader column={column} title="Name" />;
}

describe("SortingTableHeader", () => {
  it("renders properly", () => {
    render(<SortingTableHeaderWithProviders />);

    expect(screen.getByRole("button", { name: title })).toHaveClass(
      "whitespace-nowrap text-primary-700 hover:text-primary-500",
    );
    expect(screen.getByTestId("Button-ghost")).toBeInTheDocument();
  });

  describe("renders the right icon and aria-sorted correctly", () => {
    it("when unsorted", () => {
      render(<SortingTableHeaderWithProviders />);

      expect(screen.getByRole("button")).toHaveAttribute("aria-sort", "none");
      expect(screen.getByTestId("icon-ChevronsUpDown")).toBeInTheDocument();
    });

    it("when sorting order is ascending", () => {
      render(<SortingTableHeaderWithProviders />);

      fireEvent.click(screen.getByText("Name"));

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
      expect(screen.getByTestId("icon-ChevronDown")).toBeInTheDocument();
    });

    it("when sorting order is descending", () => {
      render(<SortingTableHeaderWithProviders />);

      fireEvent.click(screen.getByText("Name"));
      fireEvent.click(screen.getByText("Name"));

      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-sort",
        "descending",
      );
      expect(screen.getByTestId("icon-ChevronUp")).toBeInTheDocument();
    });
  });

  it("correctly cycles the sorting order on click", () => {
    render(<SortingTableHeaderWithProviders />);

    fireEvent.click(screen.getByText("Name"));
    fireEvent.click(screen.getByText("Name"));
    fireEvent.click(screen.getByText("Name"));

    expect(screen.getByRole("button")).toHaveAttribute("aria-sort", "none");
  });
});
