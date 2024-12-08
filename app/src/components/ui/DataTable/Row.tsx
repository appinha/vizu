import { flexRender, Row as IRow } from "@tanstack/react-table";
import { useCallback } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

const NUMBER_STYLE = {
  fontFamily: "sans-serif",
  fontVariantNumeric: "tabular-nums",
};
const PHONE_STYLE = {
  ...NUMBER_STYLE,
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
};

type Props<T> = {
  row: IRow<T>;
  onClick: (item: T) => void;
};

export default function Row<T>(props: Props<T>) {
  const { row, onClick } = props;

  const handleClick = useCallback(
    () => onClick(row.original),
    [onClick, row.original],
  );

  return (
    <TableRow
      className="cursor-pointer"
      onClick={handleClick}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => {
        const columnDef = cell.column.columnDef;
        const style = columnDef.meta?.style;
        const numberStyle = style?.isNumber ? NUMBER_STYLE : {};
        const phoneStyle = style?.isPhone ? PHONE_STYLE : {};

        return (
          <TableCell
            key={cell.id}
            style={{
              textAlign: style?.textAlign,
              ...numberStyle,
              ...phoneStyle,
            }}
          >
            {flexRender(columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
