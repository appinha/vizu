import { render, screen } from "@testing-library/react";

import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the header container", () => {
    render(<Navbar />);

    expect(screen.getByRole("banner")).toHaveClass(
      "nav-shadow sticky top-0 z-50 flex w-full flex-row items-center space-x-4 px-4 py-2 backdrop-blur",
    );
  });

  it("renders the logo image", () => {
    render(<Navbar />);

    expect(screen.getByAltText("Vizu logo")).toHaveClass("h-12");
  });

  it("renders the logo text", () => {
    render(<Navbar />);

    expect(screen.getByText("VIZU")).toHaveClass(
      "bg-gradient-to-r from-[#7F57CE] to-[#0BC5EA] bg-clip-text text-xl font-bold tracking-wider text-transparent",
    );
  });
});
