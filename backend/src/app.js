import express from "express";
import cors from "cors";

import streamsRouter from "./routes/streams.js";
import tableRouter from "./routes/table.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/streams", streamsRouter);
app.use("/api/table", tableRouter);

export default app;
