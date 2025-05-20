import { memo, useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, setSelectedCountry, type Country } from "../store/countrySlice";
import type { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const COUNTRY_ID_DEFAULT = 1;

const CountrySelector = memo(() => {
  const dispatch = useDispatch();
  
  const { selectedCountry } = useSelector(
    (state: RootState) => state.country
  );

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.apptica.com/v1/geo?B4NKGg=${API_KEY}`
      );
      return res.data.data as Country[];
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!selectedCountry && data?.length) {
      dispatch(setSelectedCountry(COUNTRY_ID_DEFAULT));
    }
  }, [selectedCountry, data, dispatch]);

  const handleChange = (value: number) => {
    dispatch(setSelectedCountry(value));
  };

  return (
    <Select
      style={{ minWidth: 200 }}
      value={selectedCountry}
      onChange={handleChange}
      options={data?.map((country) => ({
        value: country.id,
        label: (
          <span className="flex items-center gap-x-2">
            <img src={country.icon} alt={country.name} className="w-5 h-5" />
            <span>{country.country}</span>
          </span>
        ),
      }))}
      defaultValue={COUNTRY_ID_DEFAULT}
      loading={isLoading}
    />
  );
});

export default CountrySelector;
