import { memo, use, useEffect, type ChangeEvent } from "react";
import { type Country } from "./CountryContextWrapper";
import { CountryContext } from "./CountryContext";

const COUNTRY_ID_DEFAULT = 1;

const findCountryById = (countries: Array<Country> | null, id: number) =>
  countries?.find((country) => country.id === id) ?? null;

const CountrySelector = memo(() => {
  const { countries, selectedCountry, setSelectedCountry } =
    use(CountryContext);

  useEffect(() => {
    if (!selectedCountry && countries?.length) {
      const defaultCountry = findCountryById(countries, COUNTRY_ID_DEFAULT);
      if (defaultCountry) {
        setSelectedCountry(defaultCountry);
      }
    }
  }, [selectedCountry, countries, setSelectedCountry]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = findCountryById(countries, Number(e.target.value));
    if (selected) setSelectedCountry(selected);
  };

  return (
    <div className="flex gap-2 items-center">
      <label>Select country</label>
      <select
        className="p-2 border rounded"
        value={selectedCountry?.id}
        onChange={handleChange}
      >
        {countries?.map((country: Country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default CountrySelector;
