const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


const {
    createCategory,
    getallCategory,
    updateCategory,
    getcategorybyId,
    deleteCategory
} = require("../Controllers/categoryController");

// CREATE CATEGORY
router.post("/createCategory",createCategory);

// GET ALL CATEGORIES
router.get("/getallCategory",getallCategory);

// GET SINGLE CATEGORY
router.get("/getcategorybyId/:id",getcategorybyId);

// UPDATE CATEGORY

router.put("/:id", updateCategory);
// DELETE CATEGORY
router.delete("/:id",deleteCategory);

module.exports = router;