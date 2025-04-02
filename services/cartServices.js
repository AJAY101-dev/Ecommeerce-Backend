const express= require("express");
const cartModel = require("../models/cartModel");


const createCarts = async (req, res) => {
  try {
    // const{ name } = req.body;
    const Carts = await cartModel.create(req.body);
    res.status(201).json({
      status: 201,
      message: "cart Created Successfully",
      data: Carts,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: "Error creating cart",
      details: error.message,
    });
  }
};
const getCarts = async (req, res) => {
  try {
    const id = req.id;
    const getAllCarts = await cartModel.find({userId:id});
    res.status(200).json({
      status: 200,
      message: "Fetching cart Successfully",
      data: getAllCarts,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Error while fetchingCart"
    });
  }
};
const updateCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCartData = req.body;
    const updatedCart = await cartModel.findByIdAndUpdate(id, updatedCartData);
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(404).json({ error: "Error updating cart" });
  }
};
const deleteCarts = async (req, res) => {
  try {
    const { id } = req.params;
    await cartModel.findByIdAndDelete(id);
    res.status(200).json({ message: "cart deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Error deleting cart" });
  }
};

module.exports = {
  createCarts,
  getCarts,
  updateCarts,
  deleteCarts,

}