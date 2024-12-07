import { fireEvent, render, screen } from "@testing-library/react";

import SelectMonth from "@/components/Navbar/SelectMonth";

describe("SelectMonth", () => {
  const triggerRole = "combobox";
  const placeholder = "Selecione o mês...";

  it("renders properly", () => {
    render(<SelectMonth />);

    expect(screen.getByText(placeholder)).toBeInTheDocument();
    expect(screen.getByTestId("SelectMonth")).toHaveClass("min-w-[200px]");
  });

  it("renders all the options", () => {
    render(<SelectMonth />);

    fireEvent.click(screen.getByRole(triggerRole));

    expect(screen.getAllByRole("option")).toHaveLength(12);
  });

  it("selects an option", () => {
    render(<SelectMonth />);

    fireEvent.click(screen.getByRole(triggerRole));
    fireEvent.click(screen.getByText("Março"));

    expect(screen.getByText("Março")).toBeInTheDocument();
    expect(screen.queryByText(placeholder)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole(triggerRole));
    fireEvent.click(screen.getByText("Junho"));

    expect(screen.getByText("Junho")).toBeInTheDocument();
    expect(screen.queryByText("Março")).not.toBeInTheDocument();
  });
});
