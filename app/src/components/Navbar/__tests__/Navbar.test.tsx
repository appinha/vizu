import { render, screen } from "@testing-library/react";

import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the header container", () => {
    render(<Navbar />);

    expect(screen.getByRole("banner")).toHaveClass(
      "nav-shadow sticky top-0 z-50 flex w-full flex-row items-center space-x-4 px-4 py-2 backdrop-blur",
    );
  });

  it("renders the Logo component", () => {
    render(<Navbar />);

    expect(screen.getByTestId("Logo")).toBeInTheDocument();
  });

  it("renders the SelectMonth component", () => {
    render(<Navbar />);

    expect(screen.getByTestId("SelectMonth")).toBeInTheDocument();
  });

  it("renders the ThemeToggle component", () => {
    render(<Navbar />);

    expect(screen.getByTestId("ThemeToggle")).toBeInTheDocument();
  });
});
