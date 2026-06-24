import express from "express";
import { getProducts, updateProduct, deleteProduct, createProduct} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);

export default router;
