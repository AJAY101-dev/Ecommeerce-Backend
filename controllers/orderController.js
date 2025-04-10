const express = require("express");

console.log(" coming to the user order folder ");
const orderServices = require("../services/orderServices");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const userRoleMiddleware = require("../middlewares/userRoleMiddleware");


const router = express.Router();



router.get("/get",   authenticateMiddleware ,userRoleMiddleware, orderServices.getOrder);
router.post("/post",  authenticateMiddleware , orderServices.createOrder);
router.patch("/:id",  authenticateMiddleware ,userRoleMiddleware, orderServices.updateOrder);
router.delete("/:id",  authenticateMiddleware ,userRoleMiddleware, orderServices.deleteOrder);

module.exports = router;