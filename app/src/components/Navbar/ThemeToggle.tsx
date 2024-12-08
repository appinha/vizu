import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";

import Button from "@/components/ui/Button";
import useTheme from "@/contexts/ThemeProvider/useTheme";
import { cn } from "@/lib/utils";

export const ICON_STYLE = "h-[1.2rem] w-[1.2rem] transition-all";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const onClick = useCallback(() => {
    switch (theme) {
      case "dark":
        return setTheme("light");
      case "light":
        return setTheme("dark");
      default:
        return setTheme("light");
    }
  }, [setTheme, theme]);

  return (
    <Button
      data-testid="ThemeToggle"
      variant="ghost"
      size="icon"
      onClick={onClick}
    >
      <Sun
        data-testid="icon-Sun"
        className={cn(
          ICON_STYLE,
          "rotate-0 scale-100 dark:-rotate-90 dark:scale-0",
        )}
      />
      <Moon
        data-testid="icon-Moon"
        className={cn(
          ICON_STYLE,
          "absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
