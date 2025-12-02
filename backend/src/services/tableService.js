import { pool } from "../config/db.js";
import { redis } from "../config/redis.js";

export const tableService = {
  buildCacheKey(page, size) {
    return `json:items:page:${page}:${size}`;
  },

  async fetchFromPostgres(page = 1, size = 50) {
    const offset = (page - 1) * size;

    const query = `
      SELECT id, name, category, price, in_stock
      FROM items
      ORDER BY id
      LIMIT $1 OFFSET $2;`;

    const { rows } = await pool.query(query, [size, offset]);
    return rows;
  },
  async fetchFromRedis(page = 1, size = 50) {
    const key = this.buildCacheKey(page, size);

    const cached = await redis.call("JSON.GET", key);

    if (cached) {
      return { data: JSON.parse(cached), cache: "HIT" };
    }

    const pgData = await this.fetchFromPostgres(page, size);

    await redis.call("JSON.SET", key, "$", JSON.stringify(pgData));
    await redis.expire(key, 60);

    return { data: pgData, cache: "MISS" };
  },
};
