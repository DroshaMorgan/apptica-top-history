import "chartjs-adapter-date-fns";
import Chart from "chart.js/auto";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { memo, use, useEffect, useMemo, useRef } from "react";
import { CountryContext } from "./CountryContext";
import ExportChart from "./ExportChart";

const API_KEY = import.meta.env.VITE_API_KEY;
const COUNTRY_ID_DEFAULT = 1;

const TopHistoryChart = memo(() => {
  const elem = useRef<HTMLCanvasElement>(null);
  const chr = useRef<Chart | null>(null);
  const { selectedCountry } = use(CountryContext);
  console.log(selectedCountry);

  const url = useMemo(
    () =>
      `https://api.apptica.com/package/top_history/9379/${
        selectedCountry?.id ?? COUNTRY_ID_DEFAULT
      }?&platforms=1&B4NKGg=${API_KEY}`,
    [selectedCountry]
  );

  const { data } = useQuery({
    queryKey: ["topHistory", selectedCountry?.id ?? COUNTRY_ID_DEFAULT],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data.data;
    },
    enabled: !!selectedCountry,
  });

  const baseData = useRef({
    datasets: [] as {
      label: string;
      data: { x: number; y: number }[];
      borderWidth: number;
      tension: number;
    }[],
  });

  useEffect(() => {
    if (!elem.current) return;

    const chart = new Chart(elem.current, {
      type: "line",
      data: baseData.current,
      options: {
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "x",
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
          },
        },
        scales: {
          x: {
            time: {
              unit: "day",
              tooltipFormat: "yyyy-MM-dd",
              displayFormats: {
                day: "yyyy-MM-dd",
              },
            },
          },
          y: {
            reverse: true,
          },
        },
      },
    });

    chr.current = chart;

    return () => {
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    const chart = chr.current;
    if (!chart || !data) return;

    chart.data.datasets = [];

    for (const categoryId in data) {
      const category = data[categoryId];

      for (const subCategoryId in category) {
        const entries = category[subCategoryId];

        const dataPoints: { x: any; y: number }[] = [];

        for (const date in entries) {
          const position = entries[date];

          dataPoints.push({ x: date, y: position });
        }

        chart.data.datasets.push({
          label: `Category ${categoryId}-${subCategoryId}`,
          data: dataPoints,
          borderWidth: 1,
          tension: 0.5,
        });
      }
    }

    chart.update();
  }, [data]);

  return (
    <div className="h-96">
      <ExportChart chr={chr} />

      <canvas ref={elem} />
    </div>
  );
});

export default TopHistoryChart;
