import { memo, use, useEffect } from "react";
import { Select } from "antd";
import { CountryContext } from "./CountryContext";

const COUNTRY_ID_DEFAULT = 1;

const CountrySelector = memo(() => {
  const { countries, selectedCountry, setSelectedCountry } =
    use(CountryContext);

  useEffect(() => {
    if (!selectedCountry && countries?.length) {
        setSelectedCountry(COUNTRY_ID_DEFAULT);
    }
  }, [selectedCountry, countries, setSelectedCountry]);

  const handleChange = (value: number) => {
    setSelectedCountry(value);
  };

  return (
    <Select
      style={{ minWidth: 200 }}
      value={selectedCountry}
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
      defaultValue={COUNTRY_ID_DEFAULT}
    />
  );
});

export default CountrySelector;
