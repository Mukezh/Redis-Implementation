import { pool } from "../config/db.js";
import { redis } from "../config/redis.js";

const STREAM_KEY = "stream:metrics:cpu";

export const metricsService = {
  async fetchFromPostgres(limit = 500) {
    const query = `SELECT ts, value
      FROM metrics
      where metric_name = 'cpu'
      ORDER BY ts DESC
      LIMIT $1;`;

    const { rows } = await pool.query(query, [limit]);
    return rows.reverse();
  },

  async fetchFromRedis(limit = 500) {
    const exists = await redis.exists(STREAM_KEY);

    if (!exists) {
      const pgData = await this.fetchFromPostgres(limit);

      for (const row of pgData) {
        await redis.xadd(
          STREAM_KEY,
          "*",
          "ts",
          row.ts.getTime(),
          "value",
          row.value,
        );
      }

      return { data: pgData, cache: "MISS" };
    }

    const entries = await redis.xrevrange(STREAM_KEY, "+", "-", "COUNT", limit);

    const parsed = entries
      .map(([id, fields]) => {
        // fields = ["ts", "1673889238420", "value", "42"]

        const tsIndex = fields.indexOf("ts");
        const valueIndex = fields.indexOf("value");

        return {
          ts: new Date(Number(fields[tsIndex + 1] || 0)),
          value: Number(fields[valueIndex + 1] || 0),
        };
      })
      .reverse();
    return { data: parsed, cache: "HIT" };
  },
};
