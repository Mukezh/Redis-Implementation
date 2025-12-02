import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  database: process.env.PG_DB || "metricsdb",
  port: Number(process.env.PG_PORT) || 5432,
});
