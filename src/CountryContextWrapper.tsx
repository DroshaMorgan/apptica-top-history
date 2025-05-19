import { useState, type ReactNode } from "react";
import { CountryContext } from "./CountryContext";

export type Country = { id: number; name: string };

export const CountryProvider = ({
  children,
  countries,
}: {
  children: ReactNode;
  countries: Array<Country> | null;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <CountryContext.Provider
      value={{ countries, selectedCountry, setSelectedCountry }}
    >
      {children}
    </CountryContext.Provider>
  );
};
