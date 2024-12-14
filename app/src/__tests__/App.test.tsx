import { fireEvent, screen } from "@testing-library/react";

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

  it("selects a month", () => {
    renderWithProviders(<App />);

    fireEvent.click(screen.getByText("Selecione o mês..."));
    fireEvent.click(screen.getByText("Março"));

    expect(screen.getByText("Gastos do mês de Março")).toBeInTheDocument();
  });
});
