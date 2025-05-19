import type { Chart } from "chart.js";
import { memo, type RefObject } from "react";

const ExportChart = memo(() => {
  const handleDownloadPNG = (chr: RefObject<Chart>) => {
    const chart = chr.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.png";
    link.click();
  };

  return (
    <>
      <button
        onClick={() => handleDownloadPNG(chr)}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        PNG
      </button>
    </>
  );
});

export default ExportChart;
