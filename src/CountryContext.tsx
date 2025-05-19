import { createContext, useState, type Dispatch, type ReactNode } from "react";

export type Country = { id: number; name: string };

export const CountryContext = createContext<{
  countries: Array<Country | null> | null;
  selectedCountry: Country | null;
  setSelectedCountry: Dispatch<React.SetStateAction<Country | null>>;
}>({
  countries: null,
  selectedCountry: null,
  setSelectedCountry: () => void null,
});

export const CountryProvider = ({
  children,
  countries,
}: {
  children: ReactNode;
  countries: Array<Country | null> | null;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <CountryContext.Provider value={{ countries, selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
