import Redis from "ioredis";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

// // console.log(process.env.UPSTASH_REDIS_REST_TOKEN);
// const redis = new Redis(
//   `rediss://default:${process.env.UPSTASH_REDIS_REST_TOKEN}@${process.env.UPSTASH_REDIS_REST_URL}:6379`,
// );
// redis.on("connect", () => console.log("redis connected"));
// redis.on("error", (err) => console.error("redis error:", err));
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
