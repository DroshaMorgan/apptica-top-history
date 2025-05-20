import "./index.css";
import ChartView from "./chart/ChartView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountrySelector from "./country/CountrySelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCountries } from "./store/countrySlice";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.apptica.com/v1/geo?B4NKGg=${API_KEY}`
      );
      return res.data.data;
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data));
    }
  }, [data, dispatch]);
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl">Top History</h1>

        <CountrySelector />
      </div>

      <ChartView />
    </>
  );
}

export default App;
