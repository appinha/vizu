import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/api/baseQuery";
import { Expense } from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => ({ method: "GET", url: "/expenses/" }),
    }),
  }),
});

export const { useGetExpensesQuery } = api;
