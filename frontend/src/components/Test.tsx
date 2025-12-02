import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { getTableFromPostgres, getTableFromRedis } from "../api/table";
import type { ItemRow } from "../api/table";
import LatencyBox from "./LatencyBox";

export default function TablePanel() {
  const [rowData, setRowData] = useState<ItemRow[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [source, setSource] = useState<string>("none");

  const colDefs: ColDef<ItemRow>[] = [
    { field: "id" },
    { field: "name" },
    { field: "category" },
    { field: "price" },
    { field: "in_stock" },
  ];

  const loadPg = async () => {
    const res = await getTableFromPostgres(1, 50);
    setRowData(res.data);
    setLatency(res.latency_ms);
    setSource("POSTGRES");
  };

  const loadRedis = async () => {
    const res = await getTableFromRedis(1, 50);
    setRowData(res.data);
    setLatency(res.latency_ms);
    setSource(res.cache);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Items Table (AG Grid)</h2>

      <button onClick={loadPg}>Load from PostgreSQL</button>
      <button onClick={loadRedis} style={{ marginLeft: 10 }}>
        Load from Redis
      </button>

      <LatencyBox latency={latency} source={source} />

      <div
        className="ag-theme-alpine"
        style={{
          height: 400,
          width: 900,
          marginTop: 20,
          border: "1px solid #ccc",
        }}
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
