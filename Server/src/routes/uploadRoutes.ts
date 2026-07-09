import express from "express";
import upload from "../middleware/upload";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a product image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/", upload.single("image"), uploadImage);

export default router;