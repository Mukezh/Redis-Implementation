import axios from "axios";

export interface MetricPoint {
  ts: string | number | Date;
  value: number;
}

export interface StreamsResponse {
  data: MetricPoint[];
  latency_ms: number;
  cache: string;
}

const API = "http://localhost:4000/api/streams";

export const getFromPostgres = async (
  limit = 500,
): Promise<StreamsResponse> => {
  const res = await axios.get(`${API}/postgres?limit=${limit}`);
  return res.data;
};
export const getFromRedis = async (limit = 500): Promise<StreamsResponse> => {
  const res = await axios.get(`${API}/redis?limit=${limit}`);
  return res.data;
};
