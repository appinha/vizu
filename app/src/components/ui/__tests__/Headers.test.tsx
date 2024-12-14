import { render, screen } from "@testing-library/react";

import { H1, H2, H3, H4 } from "@/components/ui/Headers";
import { cn } from "@/lib/utils";

describe("Headers", () => {
  const customClass = "custom-class";

  it("H1 renders properly with custom classes", () => {
    render(<H1 className={customClass}>Title</H1>);

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      cn("font-heading mb-8 text-center text-3xl", customClass),
    );
  });

  it("H2 renders properly with custom classes", () => {
    render(<H2 className={customClass}>Title</H2>);

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      cn("font-heading mb-5 text-center text-2xl font-bold", customClass),
    );
  });

  it("H3 renders properly with custom classes", () => {
    render(<H3 className={customClass}>Title</H3>);

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      cn("font-heading mb-2 text-xl font-semibold", customClass),
    );
  });

  it("H4 renders properly with custom classes", () => {
    render(<H4 className={customClass}>Title</H4>);

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      cn("font-medium", customClass),
    );
  });
});
