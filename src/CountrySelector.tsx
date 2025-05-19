import { use, useEffect } from "react";
import { CountryContext, type Country } from "./CountryContext";

const COUNTRY_ID_DEFAULT = 1;

export default function CountrySelector() {
  const {countries,selectedCountry,setSelectedCountry} = use(CountryContext);

  // TODO:change later
  useEffect(() => {
    if (!selectedCountry && countries?.length) {
      const defaultCountry = countries.find(c => c?.id === COUNTRY_ID_DEFAULT);
      if (defaultCountry) {
        setSelectedCountry(defaultCountry);
      }
    }
  }, [selectedCountry, countries, setSelectedCountry]);

  return (
    <select
      className="p-2 border rounded"
      value={selectedCountry?.id}
      onChange={(e) => {
        const selected = countries?.find((c: Country | null) => c?.id === Number(e.target.value));
        if (selected) setSelectedCountry({ id: selected.id, name: selected.name });
      }}
      
    >
      <option value="">Select country</option>
      {countries?.map((c: Country | null) => (
        <option key={c?.id} value={c?.id}>
          {c?.name}
        </option>
      ))}
    </select>
  );
}
