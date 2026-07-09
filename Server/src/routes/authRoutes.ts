import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
} from "../controllers/authController";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", getUsers);

export default router;