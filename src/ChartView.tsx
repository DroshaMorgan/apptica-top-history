import "chartjs-adapter-date-fns";
import Chart from "chart.js/auto";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const API_KEY = "fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l";
const COUNTRY_ID = 1;
const DATE_FROM = "2025-05-14";
const DATE_TO = "2025-05-15";

const url = `https://api.apptica.com/package/top_history/9379/${COUNTRY_ID}?date_from=${DATE_FROM}&date_to=${DATE_TO}&platforms=1&B4NKGg=${API_KEY}`;

export default function TopHistoryChart() {
  const elem = useRef<HTMLCanvasElement>(null);
  const chr = useRef<Chart | null>(null);

  const { data } = useQuery({
    queryKey: ["topHistory"],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data.data;
    },
  });

  const baseData = useRef({
    labels: [] as string[],
    datasets: [] as {
      label: string;
      data: number[];
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
            onClick: () => null,
          },
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              tooltipFormat: "yyyy-MM-dd",
              displayFormats: {
                day: "yyyy-MM-dd",
              },
            },
            title: {
              display: false,
              text: "Date",
            },
          },
          y: {
            reverse: true,
            title: {
              display: false,
              text: "Position",
            },
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

    chart.data.labels = [];
    chart.data.datasets = [];

    const labelSet = new Set<string>();

    for (const categoryId in data) {
      const category = data[categoryId];

      for (const subCategoryId in category) {
        const entries = category[subCategoryId];

        const dataPoints: { x: string; y: number }[] = [];

        for (const date in entries) {
          const position = entries[date];
          dataPoints.push({ x: date, y: position });
          labelSet.add(date);
        }

        chart.data.datasets.push({
          label: `Категория ${categoryId}-${subCategoryId}`,
          data: dataPoints,
          borderWidth: 1,
          tension: 0.4,
        });
      }
    }

    chart.data.labels = Array.from(labelSet).sort();
    chart.update();
  }, [data]);

  return (
    <div className="h-96">
      <canvas ref={elem} />
    </div>
  );
}
