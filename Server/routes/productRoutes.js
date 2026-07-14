const express = require("express");
const router = express.Router();

const {
addProduct,
getAllProduct,
getProductById,
updateProduct,
deleteProduct
} = require("../controllers/productController");


//---Create Product---//
router.post("/", addProduct);

//---Read All Product with Redis cache--//
router.get("/", getAllProduct);

//Read Single Product ///
router.get("/:id", getProductById);

//Update Product//
router.put("/:id", updateProduct);

//Delete Product//
router.delete("/:id", deleteProduct);

module.exports = router;