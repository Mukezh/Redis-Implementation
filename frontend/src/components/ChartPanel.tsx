import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getFromPostgres, getFromRedis } from "../api/streams";
import type { MetricPoint } from "../api/streams";
import LatencyBox from "./LatencyBox";

export default function ChartPanel() {
  const [data, setData] = useState<MetricPoint[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [source, setSource] = useState<string>("none");

  const loadPg = async () => {
    const res = await getFromPostgres();
    setData(res.data);
    setLatency(res.latency_ms);
    setSource("POSTGRES");
  };

  const loadRedis = async () => {
    const res = await getFromRedis();
    setData(res.data);
    setLatency(res.latency_ms);
    setSource(res.cache);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CPU Usage (Recharts)</h2>

      <button onClick={loadPg}>Load from PostgreSQL</button>
      <button onClick={loadRedis} style={{ marginLeft: 10 }}>
        Load from Redis
      </button>

      <LatencyBox latency={latency} source={source} />

      <LineChart width={800} height={400} data={data} style={{ marginTop: 20 }}>
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="ts"
          tickFormatter={(v) => new Date(v).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip labelFormatter={(v) => new Date(v).toLocaleTimeString()} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
