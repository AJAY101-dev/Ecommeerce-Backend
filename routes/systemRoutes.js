const express = require("express");


const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const categoryController = require("../controllers/categoryController");
const uploadsController = require("../controllers/uploadsController")
const mailController = require("../controllers/mailController")
const googleController = require("../controllers/googleController")
const paymentController = require("../controllers/paymentController")




//  defining the all routes to all different paths

const routes = express.Router();

routes.use("/cart", cartController);
routes.use("/product", productController);
routes.use("/user", userController);
routes.use("/order", orderController);
routes.use("/category", categoryController);
routes.use("/uploads", uploadsController);
routes.use("/emails", mailController);
routes.use("/", googleController);
routes.use("/payment", paymentController);








module.exports = routes;
