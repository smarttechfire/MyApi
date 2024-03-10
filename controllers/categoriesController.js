const Category = require("../models/category");
const Product = require("../models/product");

const mongoose = require("mongoose");

//create a product

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "Name is required" });
    }

    if(await Category.findOne({name: req.body.name})){
      return res.status(409).json({error: `The Category ${req.body.name} already exists`})
    }
   
    const newCategory = await Category.create(req.body);
    return res.status(200).json(newCategory);


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get All Products

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");

    return res.status(500).json(categories);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};



exports.updateCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid id" });
    }
    if (!(await Category.exists({ _id: req.params.id }))) {
      return res.status(404).json({ error: "Category not found" });
    }
    const categoryUpdated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json(categoryUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid id" });
    }

    const categoryDelete = await Category.findById(req.params.id);
    if (!categoryDelete) {
      return res.status(404).json({ error: "Category not found" });
    } else {
      const productsCount = await Product.countDocuments({category: categoryDelete._id})
      if(productsCount > 0){
        return res.status(409).json({error: `Category ${categoryDelete.name} is being use in ${productsCount} product(s)`})
      }
      await categoryDelete.deleteOne();
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
