const express = require("express");


const router = express.Router();


// CREATE CATEGORY

const {
    createCategory
} = require("../Controllers/categoryController");
router.post("/",createCategory);


// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// GET SINGLE CATEGORY
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE CATEGORY
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;