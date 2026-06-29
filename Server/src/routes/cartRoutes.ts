import express from "express";
import { calculateCartTotal } from "../controllers/cartController";

const router = express.Router();

router.post("/total", calculateCartTotal);

export default router;