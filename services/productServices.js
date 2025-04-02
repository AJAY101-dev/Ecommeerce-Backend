const express= require("express");
const productModel = require("../models/productsModel");


const createProducts = async (req, res) => {
  try {
    // const{ name } = req.body;
    const products = await productModel.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Product Created Successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Error creating product",
      details: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const getAllProducts = await productModel.find();
    res.status(200).json({
      status: 200,
      message: "Fetching product Successfully",
      data: getAllProducts,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Error while fetching product",
    });
  }
};
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedProductData);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Error updating product" });
  }
};
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Error deleting product" });
  }
};

module.exports = {
  createProducts,
  getProducts,
  updateProducts,
  deleteProducts,

}