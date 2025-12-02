import { tableService } from "../services/tableService.js";

export const tableController = {
  async postgres(req, res) {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 50);

    const start = Date.now();
    const data = await tableService.fetchFromPostgres(page, size);

    res.json({
      data,
      latency_ms: Date.now() - start,
      cache: "NONE",
    });
  },
  async redis(req, res) {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 50);

    const start = Date.now();
    const result = await tableService.fetchFromRedis(page, size);

    res.json({
      data: result.data,
      latency_ms: Date.now() - start,
      cache: result.cache,
    });
  },
};
