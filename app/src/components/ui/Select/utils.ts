import { SelectOption } from "@/components/ui/Select/types";

export default function buildOptions<V extends string>(
  values: ReadonlyArray<V>,
): ReadonlyArray<SelectOption<V>> {
  return values.map((value) => ({ value, label: value }));
}
