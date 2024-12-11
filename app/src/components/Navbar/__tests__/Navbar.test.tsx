import { screen } from "@testing-library/react";

import Navbar from "@/components/Navbar";
import { renderWithProviders } from "@/testing/renderWithProviders";

describe("Navbar", () => {
  it("renders the header container", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByRole("banner")).toHaveClass(
      "nav-shadow sticky top-0 z-50 flex w-full flex-row items-center space-x-4 px-4 py-2 backdrop-blur",
    );
  });

  it("renders the Logo component", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("Logo")).toBeInTheDocument();
  });

  it("renders the SelectMonth component", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("SelectMonth")).toBeInTheDocument();
  });

  it("renders the ThemeToggle component", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("ThemeToggle")).toBeInTheDocument();
  });
});
