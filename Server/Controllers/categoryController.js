const Category = require("../models/Category");

const createCategory= async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  };
};

module.exports = {
    createCategory
};
