import { PropsWithChildren } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = PropsWithChildren & {
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
