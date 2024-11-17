import { render, screen } from "@testing-library/react";

import App from "@/App";

describe("App", () => {
  it("renders the Navbar component", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the Page component", () => {
    render(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
