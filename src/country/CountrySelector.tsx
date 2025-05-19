import { memo, use, useEffect } from "react";
import { type Country } from "./CountryContextWrapper";
import { Select } from "antd";
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

  const handleChange = (value: number) => {
    const selected = findCountryById(countries, value);
    if (selected) setSelectedCountry(selected);
  };

  return (
    <Select
      style={{ minWidth: 200 }}
      value={selectedCountry?.id}
      onChange={handleChange}
      options={countries?.map((country) => ({
        value: country.id,
        label: (
          <span className="flex items-center gap-x-2">
            <img src={country.icon} alt={country.name} className="w-5 h-5" />
            <span>{country.country}</span>
          </span>
        ),
      }))}
    />
  );
});

export default CountrySelector;
