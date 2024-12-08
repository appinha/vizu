import { useAppSelector } from "@/store";
import { selectSelectedMonth } from "@/store/Data/reducer";

export function useSelectedMonth() {
  const selectedMonth = useAppSelector(selectSelectedMonth);

  return selectedMonth;
}
