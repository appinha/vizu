import { configureStore } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render, renderHook } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import { AppStore, rootReducer, RootState } from "@/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const prepareProviders = (extendedRenderOptions: ExtendedRenderOptions) => {
  const {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = extendedRenderOptions;

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, container: { wrapper: Wrapper, ...renderOptions } };
};

/**
 * @public
 */
export const renderWithProviders = async (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const { container, ...rest } = prepareProviders(extendedRenderOptions);

  const view = {
    ...render(ui, container),
    ...rest,
  };

  return view;
};

/**
 * @public
 */
export const renderHookWithProviders = <Result, Props>(
  renderCustomHook: (initialProps: Props) => Result,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const { container, ...rest } = prepareProviders(extendedRenderOptions);

  return {
    ...renderHook(renderCustomHook, container),
    ...rest,
  };
};
