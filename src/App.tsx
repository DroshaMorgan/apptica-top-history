import "./index.css";
import ChartView from "./ChartView";
import CountrySelector from "./CountrySelector";
import { CountryProvider } from "./CountryContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    <CountryProvider country={data}>
      <div className="flex justify-between p-4">
        <h1>Top History Chart</h1>

        <CountrySelector />
      </div>

      <ChartView />
    </CountryProvider>
  );
}

export default App;
