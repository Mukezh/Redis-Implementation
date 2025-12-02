import express from "express";
import { tableController } from "../controllers/tableController.js";

const router = express.Router();

router.get("/postgres", tableController.postgres);
router.get("/redis", tableController.redis);

export default router;
