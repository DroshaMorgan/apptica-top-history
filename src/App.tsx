import "./index.css";
import ChartView from "./ChartView";

function App() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <h1>Top History Chart</h1>
      </div>

      <ChartView />
    </div>
  );
}

export default App;
