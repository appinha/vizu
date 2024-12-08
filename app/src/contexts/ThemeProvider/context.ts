import { createContext } from "react";

import { ThemeProviderState } from "@/contexts/ThemeProvider/types";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
