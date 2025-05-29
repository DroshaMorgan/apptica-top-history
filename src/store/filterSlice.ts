import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type DateFilter = {
  from: string | null;
  to: string | null;
};

const initialState: DateFilter = {
  from: null,
  to: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string | null>) => {
      state.from = action.payload;
    },
    setToDate: (state, action: PayloadAction<string | null>) => {
      state.to = action.payload;
    },
    resetDates: (state) => {
      state.from = null;
      state.to = null;
    },
  },
});

export const { setFromDate, setToDate, resetDates } = filterSlice.actions;

export default filterSlice.reducer;
