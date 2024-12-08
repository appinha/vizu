import { flexRender, HeaderGroup } from "@tanstack/react-table";

import { TableHead, TableHeader, TableHeaderRow } from "@/components/ui/table";

type HeaderProps<T> = {
  headerGroups: HeaderGroup<T>[];
};

export default function Header<T>(props: HeaderProps<T>) {
  const { headerGroups } = props;

  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableHeaderRow>
      ))}
    </TableHeader>
  );
}
