-- Drop existing tables if they exist
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS items;

---------------------------------------------------
-- 1. Create metrics table (time-series)
---------------------------------------------------
CREATE TABLE metrics (
  id BIGSERIAL PRIMARY KEY,
  ts TIMESTAMP NOT NULL,
  metric_name TEXT NOT NULL,
  value INT NOT NULL
);

-- Insert 1M time-series rows
INSERT INTO metrics (ts, metric_name, value)
SELECT
  NOW() - (i * INTERVAL '1 second') AS ts,
  'cpu' AS metric_name,
  (RANDOM() * 100)::INT AS value
FROM generate_series(1, 1000000) AS i;


---------------------------------------------------
-- 2. Create items table (for AG Grid)
---------------------------------------------------
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INT NOT NULL,
  in_stock BOOLEAN NOT NULL
);

-- Insert 50k rows
INSERT INTO items (name, category, price, in_stock)
SELECT
  'Item ' || i AS name,
  CHR(65 + (RANDOM() * 3)::INT) AS category,   -- A/B/C/D
  (RANDOM() * 500)::INT AS price,
  (RANDOM() > 0.5) AS in_stock
FROM generate_series(1, 50000) AS i;


---------------------------------------------------
-- Indexes for performance (important)
---------------------------------------------------
CREATE INDEX idx_metrics_ts ON metrics(ts);
CREATE INDEX idx_metrics_metric_name ON metrics(metric_name);
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_price ON items(price);
