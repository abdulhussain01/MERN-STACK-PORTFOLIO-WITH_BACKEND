import express from "express";

import {
  deleteApplications,
  getAllSoftwareApplications,
  addNewApplications,
} from "../controllers/softwareApplications.controllers.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/add", isAuthenticated, addNewApplications);
router.delete("/delete/:id", isAuthenticated, deleteApplications);
router.get("/getall", getAllSoftwareApplications);

export default router;
