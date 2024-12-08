import logo from "/logo-lines.svg";
import { cn } from "@/lib/utils";
import { useSelectedMonth } from "@/store/Data/hooks";

export default function Page({ className }: { className?: string }) {
  const selectedMonth = useSelectedMonth();

  return (
    <main className="max-w-xxl mx-auto flex-1">
      <div
        data-testid="page-content"
        className={cn(
          "flex w-full items-center justify-center px-4 py-6",
          className,
        )}
      >
        {selectedMonth ? (
          `Mês selecionado: ${selectedMonth}`
        ) : (
          <img src={logo} className="h-36" alt="Vizu logo" />
        )}
      </div>
    </main>
  );
}
