import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

export type Country = {
  id: number;
  name: string;
  icon: string;
  country: string;
};

type CountryState = {
  countries: Country[] | null;
  selectedCountry: number | null;
};

const initialState: CountryState = {
  countries: null,
  selectedCountry: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
    },
    setSelectedCountry(state, action: PayloadAction<number>) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setCountries, setSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
