import { Column, SortDirection } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useCallback } from "react";

import Button from "@/components/ui/Button";

type Props<T> = {
  column: Column<T, unknown>;
  title: string;
};

export default function SortingTableHeader<T>(props: Props<T>) {
  const { column, title } = props;

  const onClick = useCallback(
    () => column.toggleSorting(undefined, true),
    [column],
  );

  const { ariaSort, Icon } = getSortingOrderProps(column.getIsSorted());

  return (
    <Button
      variant="ghost"
      aria-sort={ariaSort}
      onClick={onClick}
      className="text-primary-700 hover:text-primary-500 whitespace-nowrap"
    >
      {title}
      <Icon />
    </Button>
  );
}

const getSortingOrderProps = (isSorted: false | SortDirection) => {
  if (isSorted === "asc")
    return { ariaSort: "ascending" as const, Icon: ChevronDown };

  if (isSorted === "desc")
    return { ariaSort: "descending" as const, Icon: ChevronUp };

  return { ariaSort: "none" as const, Icon: ChevronsUpDown };
};
