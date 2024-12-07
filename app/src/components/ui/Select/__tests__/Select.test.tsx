import { fireEvent, render, screen } from "@testing-library/react";

import Select from "@/components/ui/Select";
import buildOptions from "@/components/ui/Select/utils";

describe("Select", () => {
  const value = "";
  const setValue = vi.fn();
  const options = buildOptions(["Option 1", "Option 2"]);
  const defaultProps = { value, setValue, options };
  const defaultPlaceholder = "Selecione...";

  it("renders the default placeholder", () => {
    render(<Select {...defaultProps} />);

    expect(screen.getByText(defaultPlaceholder)).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    const customPlaceholder = "Custom placeholder";

    render(<Select {...defaultProps} placeholder={customPlaceholder} />);

    expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
  });

  it("renders all the options", () => {
    render(<Select {...defaultProps} />);

    fireEvent.click(screen.getByRole("combobox"));

    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("renders a value", () => {
    const selectedValue = "Option 1";

    render(<Select {...defaultProps} value={selectedValue} />);

    expect(screen.getByText(selectedValue)).toBeInTheDocument();
  });

  it("selects an option", () => {
    const selectedValue = "Option 2";

    render(<Select {...defaultProps} />);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText(selectedValue));

    expect(screen.getByText(selectedValue)).toBeInTheDocument();
    expect(screen.queryByText(defaultPlaceholder)).not.toBeInTheDocument();
  });
});
