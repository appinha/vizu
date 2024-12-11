import { Month } from "@/constants/dates";
import { createAppSlice } from "@/store/createAppSlice";

type DataState = {
  selectedMonth: Month | undefined;
};

const initialState: DataState = {
  selectedMonth: undefined,
};

export const dataSlice = createAppSlice({
  name: "data",
  initialState,
  reducers: (create) => ({
    selectMonth: create.reducer(
      (state, { payload }: { payload: Month | undefined }) => {
        state.selectedMonth = payload;
      },
    ),
  }),
  selectors: {
    selectSelectedMonth: (state) => state.selectedMonth,
  },
});

export const { selectMonth } = dataSlice.actions;

export const { selectSelectedMonth } = dataSlice.selectors;
