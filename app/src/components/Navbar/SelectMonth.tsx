import { useCallback } from "react";

import Select from "@/components/ui/Select";
import buildOptions from "@/components/ui/Select/utils";
import { Month, MONTHS } from "@/constants/dates";
import { useAppDispatch } from "@/store";
import { useSelectedMonth } from "@/store/Data/hooks";
import { selectMonth } from "@/store/Data/reducer";

const MONTH_OPTIONS = buildOptions(MONTHS);

export default function SelectMonth() {
  const dispatch = useAppDispatch();
  const selectedMonth = useSelectedMonth();

  const setMonth = useCallback(
    (month: Month | undefined) => {
      dispatch(selectMonth(month));
    },
    [dispatch],
  );

  return (
    <div data-testid="SelectMonth" className="min-w-[200px]">
      <Select
        placeholder="Selecione o mês..."
        value={selectedMonth}
        setValue={setMonth}
        options={MONTH_OPTIONS}
      />
    </div>
  );
}
