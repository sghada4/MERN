const categoryModel = require("../models/category.model");
const slugify = require("slugify");

//new category
module.exports.newCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

//update category
module.exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

//find all categories
module.exports.allCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all categories",
      error,
    });
  }
};

//find one category
module.exports.oneCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const oneCategory = await categoryModel.findOne({ slug });

    res.status(200).send({
      success: true,
      message: "Find category successfully",
      oneCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting this category",
      error,
    });
  }
};

//delete category
module.exports.deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
  
      res.status(200).send({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting category",
        error,
      });
    }
  };
  