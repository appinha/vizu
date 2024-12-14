import logo from "/logo-lines.svg";
import MonthTable from "@/components/MonthTable";
import { cn } from "@/lib/utils";
import { useSelectedMonth } from "@/store/Data/hooks";

export default function Page({ className }: { className?: string }) {
  const selectedMonth = useSelectedMonth();

  return (
    <main className="mx-auto max-w-6xl flex-1">
      <div
        data-testid="page-content"
        className={cn("flex w-full flex-grow px-4 py-6", className)}
      >
        {selectedMonth ? (
          <MonthTable month={selectedMonth} />
        ) : (
          <div className="flex items-center">
            <img src={logo} className="h-36" alt="Vizu logo" />
          </div>
        )}
      </div>
    </main>
  );
}
