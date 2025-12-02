import axios from "axios";

export interface ItemRow {
  id: number;
  name: string;
  category: string;
  price: number;
  in_stock: boolean;
}

export interface TableResponse {
  data: ItemRow[];
  latency_ms: number;
  cache: string;
}

const API = "http://localhost:4000/api/table";

export const getTableFromPostgres = async (
  page = 1,
  size = 50,
): Promise<TableResponse> => {
  const res = await axios.get(`${API}/postgres?page=${page}&size=${size}`);
  return res.data;
};

export const getTableFromRedis = async (
  page = 1,
  size = 50,
): Promise<TableResponse> => {
  const res = await axios.get(`${API}/redis?page=${page}&size=${size}`);
  return res.data;
};
