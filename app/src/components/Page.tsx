import logo from "/logo-lines.svg";
import { cn } from "@/lib/utils";

export default function Page({ className }: { className: string }) {
  return (
    <main className={cn("max-w-xxl mx-auto flex-1")}>
      <div
        className={cn(
          "flex w-full items-center justify-center px-4 py-6",
          className,
        )}
      >
        <img src={logo} className="logo h-36" alt="Vizu logo" />
      </div>
    </main>
  );
}
