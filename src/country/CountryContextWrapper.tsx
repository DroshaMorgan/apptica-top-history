import { memo, useState, type PropsWithChildren } from "react";
import { CountryContext } from "./CountryContext";

export type Country = {
  id: number;
  name: string;
  icon: string;
  country: string;
};

export const CountryProvider = memo<
  PropsWithChildren<{ countries: Array<Country> | null }>
>(({ children, countries }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <CountryContext.Provider
      value={{ countries, selectedCountry, setSelectedCountry }}
    >
      {children}
    </CountryContext.Provider>
  );
});
