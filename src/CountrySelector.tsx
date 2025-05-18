import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCountry } from "./CountryContext";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function CountrySelector() {
  const { country, setCountry } = useCountry();

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.apptica.com/v1/geo?B4NKGg=${API_KEY}`
      );
      return res.data.data;
    },
  });

  if (isLoading) return <p>Loading countries...</p>;

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
      {data.map((c: any) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
