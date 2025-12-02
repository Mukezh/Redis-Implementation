import { metricsService } from "../services/metricService.js";

export const streamsController = {
  async postgres(req, res) {
    const limit = Number(req.query.limit || 500);
    const start = Date.now();

    const data = await metricsService.fetchFromPostgres(limit);

    res.json({
      data,
      latency_ms: Date.now() - start,
      cache: "NONE",
    });
  },

  async redis(req, res) {
    const limit = Number(req.query.limit || 500);
    const start = Date.now();

    const result = await metricsService.fetchFromRedis(limit);

    res.json({
      data: result.data,
      latency_ms: Date.now() - start,
      cache: result.cache,
    });
  },
};
