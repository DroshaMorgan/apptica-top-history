import "./index.css";
import ChartView from "./chart/ChartView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CountryProvider } from "./country/CountryContextWrapper";
import CountrySelector from "./country/CountrySelector";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.apptica.com/v1/geo?B4NKGg=${API_KEY}`
      );
      return res.data.data;
    },
  });

  return (
    <CountryProvider countries={data}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl">Top History</h1>

        <CountrySelector />
      </div>

      <ChartView />
    </CountryProvider>
  );
}

export default App;
