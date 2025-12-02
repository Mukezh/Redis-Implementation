import ChartPanel from "../components/ChartPanel";
import TablePanel from "../components/TablePanel";

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ margin: 20 }}>Redis vs PostgreSQL Analytics Demo</h1>
      <ChartPanel />
      <TablePanel />
    </div>
  );
}
