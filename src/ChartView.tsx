import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l";
const COUNTRY_ID = 1;
const DATE_FROM = "2025-05-14";
const DATE_TO = "2025-05-15";

const url = `https://api.apptica.com/package/top_history/9379/${COUNTRY_ID}?date_from=${DATE_FROM}&date_to=${DATE_TO}&platforms=1&B4NKGg=${API_KEY}`;

export default function ChartView() {
  const { data } = useQuery({
    queryKey: ["topHistory"],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return (
    <>
      chart
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
