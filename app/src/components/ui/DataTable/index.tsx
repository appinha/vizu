import { Table as ITable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Header from "./Header";
import Row from "./Row";

type Props<T> = {
  table: ITable<T>;
  onClick?: (item: T) => void;
};

export default function DataTable<T>(props: Props<T>) {
  const { table, onClick } = props;
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const columns = table.getAllColumns();

  return (
    <Table>
      <Header headerGroups={headerGroups} />
      <TableBody>
        {rows.length ? (
          rows.map((row) => <Row key={row.id} row={row} onClick={onClick} />)
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
