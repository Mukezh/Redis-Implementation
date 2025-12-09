import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.UPSTASH_REDIS_REST_TOKEN);
export const redis = new Redis(
  `rediss://default:${process.env.UPSTASH_REDIS_REST_TOKEN}@${process.env.UPSTASH_REDIS_REST_URL}:6379`,
);

// export const redis = new Redis({
//   // host: process.env.REDIS_HOST || "localhost",
//   // port: Number(process.env.REDIS_PORT) || 6379,
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

redis.on("connect", () => console.log("redis connected"));
redis.on("error", (err) => console.error("redis error:", err));
