import { use } from "react";
import { CountryContext, type Country } from "./CountryContext";

export default function CountrySelector() {
  const {countries,selectedCountry,setSelectedCountry} = use(CountryContext);

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
