import { render, screen } from "@testing-library/react";

import Logo from "@/components/Navbar/Logo";

describe("Logo", () => {
  it("renders the logo image", () => {
    render(<Logo />);

    expect(screen.getByAltText("Vizu logo")).toHaveClass("h-12");
  });

  it("renders the logo text", () => {
    render(<Logo />);

    expect(screen.getByText("VIZU")).toHaveClass(
      "bg-gradient-to-r from-[#7F57CE] to-[#0BC5EA] bg-clip-text text-xl font-bold tracking-wider text-transparent",
    );
  });
});
