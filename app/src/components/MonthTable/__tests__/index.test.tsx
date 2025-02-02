import { fireEvent, screen, waitFor } from "@testing-library/react";

import MonthTable from "@/components/MonthTable";
import { Month } from "@/constants/dates";
import { renderWithProviders } from "@/testing/renderWithProviders";

describe("MonthTable", () => {
  const month: Month = "Janeiro";
  const defaultProps = { month };

  const renderComponent = async () => {
    renderWithProviders(<MonthTable {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(3);
    });
  };

  it("renders the header", async () => {
    await renderComponent();

    expect(
      screen.getByRole("heading", { name: "Gastos do mês de Janeiro" }),
    ).toBeInTheDocument();
  });

  it("renders the table", async () => {
    await renderComponent();

    expect(
      screen.getByRole("row", { name: "Data Valor Descrição Categoria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "09/12 81.5 Mia Pizzaria Restaurante" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("row", {
        name: "06/12 288 Risoteria Villa Lobos Restaurante",
      }),
    ).toBeInTheDocument();
  });

  it("on table header click, sorts the data", async () => {
    await renderComponent();

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("81.5Mia Pizzaria");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent(
      "288Risoteria Villa Lobos",
    );

    fireEvent.click(screen.getByRole("button", { name: "Valor" }));

    expect(screen.getAllByRole("row")[1]).toHaveTextContent(
      "288Risoteria Villa Lobos",
    );
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("81.5Mia Pizzaria");
  });
});
