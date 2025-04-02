const express= require("express");
const categoryModel = require("../models/categoryModel");

// const categoryService = require("../Services/categoriesService");
const createCategories = async (req, res) => {
  try {
    const{ name } = req.body;
    const categories = await categoryModel.create({name});
    res.status(201).json({
      status: 201,
      message: "Categories Created Successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Error creating categories",
      details: error.message,
    });
  }
};
const getCategories = async (req, res) => {
  try {
    const getAllCategories = await categoryModel.find();
    res.status(200).json({
      status: 200,
      message: "Fetch categories Successfully",
      data: getAllCategories,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Error fetching categories",
    });
  }
};
const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategoriesData = req.body;
    const updatedCategories = await categoryModel.findByIdAndUpdate(id, updatedCategoriesData);
    res.status(200).send(updatedCategories);
  } catch (error) {
    res.status(404).json({ error: "Error updating categories" });
  }
};
const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Categories deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Error deleting categories" });
  }
};

module.exports = {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,

}