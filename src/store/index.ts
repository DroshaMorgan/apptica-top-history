import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countrySlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
