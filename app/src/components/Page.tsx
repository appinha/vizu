import { useCallback } from "react";

import logo from "/logo-lines.svg";
import api from "@/api";
import { cn } from "@/lib/utils";

export default function Page({ className }: { className?: string }) {
  const pingBackend = useCallback(async () => {
    const data = await api.healthcheck();
    console.log(data);
  }, []);

  return (
    <main className="max-w-xxl mx-auto flex-1">
      <div
        data-testid="page-content"
        className={cn(
          "flex w-full items-center justify-center px-4 py-6",
          className,
        )}
      >
        <img src={logo} className="h-36" alt="Vizu logo" />
        <button onClick={pingBackend}>Ping backend</button>
      </div>
    </main>
  );
}
