import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import SortingTableHeader from "@/components/ui/DataTable/SortingTableHeader";
import { Expense } from "@/types";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <SortingTableHeader title="Data" column={column} />,
    cell: ({ row }) => format(row.original.date, "dd/MM"),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <SortingTableHeader title="Valor" column={column} />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortingTableHeader title="Descrição" column={column} />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <SortingTableHeader title="Categoria" column={column} />
    ),
  },
];
