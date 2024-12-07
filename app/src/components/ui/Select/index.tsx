import { SelectOptions } from "@/components/ui/Select/types";

import {
  Select as SelectContainer,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components";

type Props<T> = {
  placeholder?: string;
  options: SelectOptions<T>;
  value: T;
  setValue: (v: T) => void;
};

export default function Select<T extends string>(props: Props<T>) {
  const { placeholder = "Selecione...", options, value, setValue } = props;

  return (
    <div>
      <SelectContainer defaultValue={value} onValueChange={setValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectContainer>
    </div>
  );
}
