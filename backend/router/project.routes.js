import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
import {
  addProject,
  deleteProject,
  getAllProjects,
  updateProject,
  getSingleProject,
} from "../controllers/project.controllers.js";

const router = express.Router();

router.post("/add", isAuthenticated, addProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router;
