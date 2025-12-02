import express from "express";
import { streamsController } from "../controllers/streamsController.js";

const router = express.Router();

router.get("/postgres", streamsController.postgres);
router.get("/redis", streamsController.redis);

export default router;
