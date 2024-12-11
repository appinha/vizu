import { screen } from "@testing-library/react";

import Page from "@/components/Page";
import { renderWithProviders } from "@/testing/renderWithProviders";

describe("Page", () => {
  it("renders the main container", () => {
    renderWithProviders(<Page />);

    expect(screen.getByRole("main")).toHaveClass("max-w-xxl mx-auto flex-1");
  });

  it("renders the content container", () => {
    renderWithProviders(<Page />);

    expect(screen.getByTestId("page-content")).toHaveClass(
      "flex w-full items-center justify-center px-4 py-6",
    );
  });

  it("renders the content container with prop className", () => {
    renderWithProviders(<Page className="something" />);

    expect(screen.getByTestId("page-content")).toHaveClass("something");
  });

  it("renders the logo", () => {
    renderWithProviders(<Page className="something" />);

    expect(screen.getByAltText("Vizu logo")).toHaveClass("h-36");
  });
});
