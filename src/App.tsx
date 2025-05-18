import "./index.css";
import ChartView from "./ChartView";
import CountrySelector from "./CountrySelector";

function App() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <h1>Top History Chart</h1>

        <CountrySelector />
      </div>

      <ChartView />
    </div>
  );
}

export default App;
