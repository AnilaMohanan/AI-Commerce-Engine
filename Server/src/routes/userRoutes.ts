import express from "express";
import { getProfile, updateProfile } from "../controllers/userController";

const router = express.Router();

// Get user profile
router.get("/:id", getProfile);

// Update user profile
router.put("/:id", updateProfile);

export default router;