import { use, useEffect, type ChangeEvent } from "react";
import { CountryContext, type Country } from "./CountryContext";

const COUNTRY_ID_DEFAULT = 1;

const findCountryById = (countries: Array<Country | null> | null, id: number) =>
  countries?.find(country => country?.id === id) ?? null;

export default function CountrySelector() {
  const {countries,selectedCountry,setSelectedCountry} = use(CountryContext);

  useEffect(() => {
    if (!selectedCountry && countries?.length) {
      const defaultCountry = findCountryById(countries, COUNTRY_ID_DEFAULT);
      if (defaultCountry) {
        setSelectedCountry(defaultCountry)
      };
    }
  }, [selectedCountry, countries, setSelectedCountry]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = findCountryById(countries, Number(e.target.value));
    if (selected) setSelectedCountry(selected);
  };

  return (
    <div className="flex gap-2 items-center">
    <label>Выбрать страну</label>
    <select
      className="p-2 border rounded"
      value={selectedCountry?.id}
      onChange={handleChange}
      >
      {countries?.map((c: Country | null) => (
        <option key={c?.id} value={c?.id}>
          {c?.name}
        </option>
      ))}
    </select>
    </div>
  );
}
