import { useState } from "react";

import Select from "@/components/ui/Select";
import buildOptions from "@/components/ui/Select/utils";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const MONTH_OPTIONS = buildOptions(MONTHS);

export default function SelectMonth() {
  const [month, setMonth] = useState("");

  return (
    <div className="min-w-[200px]">
      <Select
        placeholder="Selecione o mês..."
        value={month}
        setValue={setMonth}
        options={MONTH_OPTIONS}
      />
    </div>
  );
}
