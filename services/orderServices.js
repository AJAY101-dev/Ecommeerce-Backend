const express = require("express");
const orderModel = require("../models/orderModel");
const Employee = require("../models/userModel");
const productModel = require("../models/productsModel");
const { orderPaymentService } = require("./orderPaymentService");
const orderMail = require("./orderEmail");

const twilio = require("twilio");
const TWILIO_ACCOUNT_SID = "AC8c88773a876141cc416fc0985226b082";
const TWILIO_AUTH_TOKEN = "c5918efb2fe029359708e62105c06eda";
const TWILIO_PHONE_NUMBER = +"14782494546";
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const userId = await Employee.findById(data.userId);
    if (!userId) {
      return res
        .status(404)
        .send({ status: 404, message: "Not such user found" });
    }
    let sum = 0;
    let priceArray = [];
    for (let item of data.items) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .send({
            status: 404,
            message: `Product not found: ${item.productId}`,
          });
      }
      let price = product.price;
      item.price = price;
      name = product.name;
      item.name = name;

      sum = sum + price * item.quantity;
    }

    const orderData = await orderModel.create({ ...data, totalPrice: sum });
    await orderPaymentService(sum, "card", userId.customerId);


//  messing on order created and payment done

const message = `Hello ${userId.name}, your order (ID: ${orderData.id}) has been successfully placed. Total price: ${sum}. Thank you for shopping with us!`;
await client.messages.create({
  body: message,
  to: "+919501686623", 
  from: TWILIO_PHONE_NUMBER, r
});


    const plainObj = JSON.parse(JSON.stringify(orderData.items));
    const mailData = {
      name: userId.name,
      to: userId.email,
      subject: "Order Placed",
      orderId: orderData.id,
      totalPrice: sum,
      items: plainObj,
    };
    orderMail(mailData);
    res.status(201).send({
      status: 201,
      message: "Items added successfully",
      data: orderData,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};
const getOrder = async (req, res) => {
  try {
    const id = req.id;
    console.log("it it getting the data", id);
    const getAllOrders = await orderModel
      .find({ userId: id })
      .populate("userId");
    console.log(getAllOrders);
    res.status(200).json({
      status: 200,
      message: "Fetching Order Successfully",
      data: getAllOrders,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Error while fetching Order",
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrderData = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      updatedOrderData
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(404).json({ error: "Error updating Order" });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await orderModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Error deleting Order" });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
