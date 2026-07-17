import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/:userId", getProfile);

router.put("/:userId", updateProfile);

export default router;