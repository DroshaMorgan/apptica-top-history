import "./App.css";
import ChartView from "./ChartView";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Top History Chart</h1>
      <ChartView />
    </div>
  );
}

export default App;
