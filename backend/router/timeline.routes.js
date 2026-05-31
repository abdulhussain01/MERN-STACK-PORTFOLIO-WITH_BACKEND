import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
import {
  deleteTimeline,
  getAllTimelines,
  getSingleTimeline,
  postTimeline,
  updateTimeline,
} from "../controllers/timeline.controllers.js";

const router = express.Router();

router.get("/getall", getAllTimelines);
router.get("/get/:id",getSingleTimeline)

router.post("/add", isAuthenticated, postTimeline);

router.put("/update/:id", isAuthenticated,updateTimeline)

router.delete("/delete/:id", isAuthenticated, deleteTimeline);

export default router;
