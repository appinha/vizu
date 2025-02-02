import { screen } from "@testing-library/react";

import Page from "@/components/Page";
import { renderWithProviders } from "@/testing/renderWithProviders";

describe("Page", () => {
  it("renders the main container", () => {
    renderWithProviders(<Page />);

    expect(screen.getByRole("main")).toHaveClass("mx-auto max-w-6xl flex-1");
  });

  it("renders the content container", () => {
    renderWithProviders(<Page />);

    expect(screen.getByTestId("page-content")).toHaveClass(
      "flex w-full flex-grow px-4 py-6",
    );
  });

  it("renders the content container with prop className", () => {
    const customClass = "custom-class";

    renderWithProviders(<Page className={customClass} />);

    expect(screen.getByTestId("page-content")).toHaveClass(customClass);
  });

  it("renders the logo when no month is selected", () => {
    renderWithProviders(<Page />);

    expect(screen.getByAltText("Vizu logo")).toHaveClass("h-36");
  });

  it("renders MonthTable component when a month is selected", () => {
    const preloadedState = { data: { selectedMonth: "Março" as const } };

    renderWithProviders(<Page />, { preloadedState });

    expect(screen.getByTestId("MonthTable")).toBeInTheDocument();
    expect(screen.queryByAltText("Vizu logo")).not.toBeInTheDocument();
  });
});
