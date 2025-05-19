import { Button } from "antd";
import type { Chart } from "chart.js";
import { memo, type RefObject } from "react";

const ExportChart = memo<{ chr: RefObject<Chart | null> }>(({ chr }) => {
  const handleDownloadPNG = () => {
    const chart = chr.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.png";
    link.click();
  };

  const handleDownloadCSV = () => {
    const chart = chr.current;
    if (!chart) return;

    let csv = "label,date,position\n";

    chart.data.datasets.forEach((dataset) => {
      dataset.data.forEach((point: any) => {
        csv += `${dataset.label},${point.x},${point.y}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.csv";
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button onClick={handleDownloadPNG} type="primary">
        PNG
      </Button>
      <Button onClick={handleDownloadCSV} type="primary">
        CSV
      </Button>
    </div>
  );
});

export default ExportChart;
