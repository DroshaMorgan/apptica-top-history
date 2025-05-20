import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Country } from "./CountryContextWrapper";

export const CountryContext = createContext<{
  countries: Array<Country> | null;
  selectedCountry: number | null;
  setSelectedCountry: Dispatch<SetStateAction<number | null>>;
}>({
  countries: null,
  selectedCountry: null,
  setSelectedCountry: () => void null,
});
