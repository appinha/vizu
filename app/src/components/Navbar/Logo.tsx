import logo from "/logo.svg";
import { cn } from "@/lib/utils";

const HIDE_IN_SMALL_SCREENS = "hidden md:block";

export default function Logo() {
  return (
    <div data-testid="Logo" className="flex flex-row items-center space-x-4">
      <img src={logo} className="h-12" alt="Vizu logo" />
      <span
        className={cn(
          "bg-gradient-to-r from-[#9947EB] to-[#0DCCF2] bg-clip-text text-xl font-bold tracking-wider text-transparent",
          HIDE_IN_SMALL_SCREENS,
        )}
      >
        VIZU
      </span>
    </div>
  );
}
