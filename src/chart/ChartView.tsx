import "chartjs-adapter-date-fns";
import { memo, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useCategoryLabels } from "../hook/useCategoryLabels";
import ExportChart from "./ExportChart";
import type { RootState } from "../store";
import { Spin } from "antd";
import dayjs from "dayjs";
import { API_KEY, COUNTRY_ID_DEFAULT } from "../libs/constants";

const TopHistoryChart = memo(() => {
  const elem = useRef<HTMLCanvasElement>(null);
  const chr = useRef<Chart | null>(null);

  const selectedCountry = useSelector(
    (state: RootState) => state.country.selectedCountry
  );
  const { from, to } = useSelector((state: RootState) => state.filter);

  const { getLabel } = useCategoryLabels();

  const url = useMemo(
    () =>
      `https://api.apptica.com/package/top_history/9379/${
        selectedCountry ?? COUNTRY_ID_DEFAULT
      }?&platforms=1&B4NKGg=${API_KEY}`,
    [selectedCountry]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["topHistory", selectedCountry ?? COUNTRY_ID_DEFAULT, from, to],
    queryFn: async () => {
      const response = await axios.get(url, {
        params: {
          date_from: from ? dayjs(from).format("YYYY-MM-DD") : undefined,
          date_to: to ? dayjs(to).format("YYYY-MM-DD") : undefined,
        },
      });
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
    if (!elem.current || chr.current) return;

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
            position: "top",
            align: "center",
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
      chr.current = null;
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
          label: getLabel(categoryId, subCategoryId),
          data: dataPoints,
          borderWidth: 1,
          tension: 0.5,
        });
      }
    }

    chart.update();
  }, [data, getLabel]);

  return (
    <Spin spinning={isLoading}>
      <div className="h-96">
        <ExportChart chr={chr} />
        <canvas ref={elem} />
      </div>
    </Spin>
  );
});

export default TopHistoryChart;
