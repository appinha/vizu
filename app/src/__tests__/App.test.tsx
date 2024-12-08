import { screen } from "@testing-library/react";

import App from "@/App";
import { renderWithProviders } from "@/testing/renderWithProviders";

describe("App", () => {
  it("renders the Navbar component", () => {
    renderWithProviders(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the Page component", () => {
    renderWithProviders(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
