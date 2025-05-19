import { use } from "react";
import { CountryContext } from "./CountryContext";



export default function CountrySelector() {
  const {country,selectedCountry,setSelectedCountry} = use(CountryContext);

  


  return (
    <select
      className="p-2 border rounded"
      value={country?.id || ""}
      onChange={(e) => {
        const selected = data.find((c: any) => c.id === Number(e.target.value));
        if (selected) setCountry({ id: selected.id, name: selected.name });
      }}
    >
      <option value="">Select country</option>
      {country?.map((c: any) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
