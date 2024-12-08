import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ThemeToggle, { ICON_STYLE } from "@/components/Navbar/ThemeToggle";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { Theme } from "@/contexts/ThemeProvider/types";
import * as useTheme from "@/contexts/ThemeProvider/useTheme";
import { cn } from "@/lib/utils";

describe("ThemeToggle", () => {
  const setThemeMock = vi.fn();

  const mockUseTheme = (theme: Theme = "light") => {
    vi.spyOn(useTheme, "default").mockImplementation(() => ({
      theme,
      setTheme: setThemeMock,
    }));
  };

  const renderComponent = () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
  };

  it("renders properly", () => {
    renderComponent();

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Toggle theme")).toHaveClass("sr-only");

    expect(screen.getByTestId("icon-Sun")).toHaveClass(
      cn(ICON_STYLE, "rotate-0 scale-100 dark:-rotate-90 dark:scale-0"),
    );
    expect(screen.getByTestId("icon-Moon")).toHaveClass(
      cn(ICON_STYLE, "absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100"),
    );
  });

  it("on click, toggles the theme from light to dark", async () => {
    mockUseTheme("light");

    renderComponent();

    fireEvent.click(screen.getByRole("button"));

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("on click, toggles the theme from dark to light", async () => {
    mockUseTheme("dark");

    renderComponent();

    fireEvent.click(screen.getByRole("button"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
