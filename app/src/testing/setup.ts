import "@testing-library/jest-dom/vitest";

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { expect } from "vitest";
import { afterEach } from "vitest";

import applyMockAdapter from "@/testing/apiMock";

declare module "vitest" {
  export interface Assertion<T>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

export let apiMock: ReturnType<typeof applyMockAdapter>;

// Global beforeEach for all tests
beforeEach(() => {
  vi.clearAllMocks();
  apiMock = applyMockAdapter();
});
