import { cn } from "@/lib/utils";
import logo from "/logo-lines.svg";

export default function Page({ className }: { className: string }) {
  return (
    <main className={cn("flex-1 max-w-xxl mx-auto")}>
      <div
        className={cn(
          "w-full flex justify-center items-center py-6 px-4",
          className,
        )}
      >
        <img src={logo} className="logo h-36" alt="Vizu logo" />
      </div>
    </main>
  );
}
