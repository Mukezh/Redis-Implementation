// export const pool = new Pool({
//   host: process.env.PG_HOST || "localhost",
//   user: process.env.PG_USER || "postgres",
//   password: process.env.PG_PASSWORD || "postgres",
//   database: process.env.PG_DB || "metricsdb",
//   port: Number(process.env.PG_PORT) || 5432,
// });
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("connected");
  } catch (er) {
    console.error("error connecting to db", er);
  }
}

test();
