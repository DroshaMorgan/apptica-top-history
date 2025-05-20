import { memo, useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../store/countrySlice";
import type { RootState } from "../store";

const COUNTRY_ID_DEFAULT = 1;

const CountrySelector = memo(() => {
  const dispatch = useDispatch();
  const { countries, selectedCountry } = useSelector(
    (state: RootState) => state.country
  );

  useEffect(() => {
    if (!selectedCountry && countries?.length) {
      dispatch(setSelectedCountry(COUNTRY_ID_DEFAULT));
    }
  }, [selectedCountry, countries, dispatch]);

  const handleChange = (value: number) => {
    dispatch(setSelectedCountry(value));
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
