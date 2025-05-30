import "./index.css";
import ChartView from "./chart/ChartView";
import CountrySelector from "./country/CountrySelector";
import FilterSelector from "./filter/FilterSelector";

function App() {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl">Top History</h1>

        <div className="flex gap-4">
          <CountrySelector />
          <FilterSelector />
        </div>
      </div>

      <ChartView />
    </>
  );
}

export default App;
