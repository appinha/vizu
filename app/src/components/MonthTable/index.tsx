import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { useGetExpensesQuery } from "@/api";
import { columns } from "@/components/MonthTable/columns";
import DataTable from "@/components/ui/DataTable";
import { H3 } from "@/components/ui/Headers";
import { Month } from "@/constants/dates";
import { Expense } from "@/types";

type Props = {
  month: Month;
};

export default function MonthTable(props: Props) {
  const { month } = props;
  const { data } = useGetExpensesQuery();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<Expense>({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div data-testid="MonthTable" className="flex w-full flex-col gap-y-2">
      <H3 className="text-center">Gastos do mês de {month}</H3>
      <DataTable table={table} />
    </div>
  );
}
