import express from "express";
import {
  forgotPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  register,
  resetPassword,
  updatedPassword,
  updateProfile,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatedPassword);
router.get("/profile/portfolio", getUserForPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
