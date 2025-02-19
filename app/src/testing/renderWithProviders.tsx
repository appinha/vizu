import { QueryStatus } from "@reduxjs/toolkit/query";
import type { RenderOptions } from "@testing-library/react";
import { render, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore, RootState } from "@/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const prepareProviders = (extendedRenderOptions: ExtendedRenderOptions) => {
  const {
    preloadedState = {},
    store = makeStore(preloadedState),
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
export const waitForResourcesToLoad = async (store: AppStore) => {
  const queries = store.getState().api.queries;

  for (const key of Object.keys(queries)) {
    if (queries[key]?.status === QueryStatus.pending)
      await waitFor(() => {
        expect(queries[key]?.status).toBe(QueryStatus.pending);
      });
  }
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

  await waitForResourcesToLoad(view.store);

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
