import express from "express";
import {
  login,
  logout,
  register,
  getAllUsers,
  getUserById,
  updateUserOnlineStatus,
} from "../controllers/user.controller.js";
import checkAccessToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", checkAccessToken, logout);

router.get("/list", checkAccessToken, getAllUsers);

router.get("/:id", checkAccessToken, getUserById);

router.patch("/:id/online", checkAccessToken, updateUserOnlineStatus);

export default router;