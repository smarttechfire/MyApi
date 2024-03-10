const Product = require("../models/product");
const mongoose = require("mongoose");
const Category = require('../models/category');
const { json } = require("body-parser");

//create a product

exports.createProduct = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: "Name is required" });
    }
    if (!req.body.price) {
      return res.status(422).json({ error: "Price is required" });
    }
    if (!req.body.category) {
      return res.status(422).json({ error: "Category is required" });
    } else if (!await Category.findById(req.body.category)) {
      return res.status(422).json({
        error: 'Category not found',
      });
    }

    const newProduct = await Product.create(req.body);
    return res.status(200).json(newProduct)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get All Products

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-__v").populate({path: 'category',select: '_id name'})

    return res.status(500).json(products);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not valid id" });
    }
    const product = await Product.findById(req.params.id).select("-__v").populate({path: 'category',select: '_id name'});
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    return res.status(500).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductByCategory = async (req,res) =>{
  try {
    if(!await Category.findById(req.params.categoryId)){
      return res.status(404).json({error: "category not found" })

    }
    const products = await Product.find({category: req.params.categoryId}).select("-__v").populate({path: 'category',select: '_id name'});
    return res.status(500).json(products);

  } catch (error) {
    return res.status(500).json({ error: error.message });
    
  }
}

exports.updateProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid id" });
    }
    if (!(await Product.exists({ _id: req.params.id }))) {
      return res.status(404).json({ error: "product not found" });
    }
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json(productUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(422).json({ error: "Parameter is not a valid id" });
    }

    const productDelete = await Product.findById(req.params.id);
    if (!productDelete) {
      return res.status(404).json({ error: "Product not found" });
    } else {
      await productDelete.deleteOne();
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
