const express = require("express");

console.log(" coming to the user cart folder ");
const cartServices = require("../services/cartServices");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const userRoleMiddleware = require("../middlewares/userRoleMiddleware");



const router = express.Router();



router.get("/get",  authenticateMiddleware ,userRoleMiddleware ,cartServices.getCarts);
router.post("/post",  authenticateMiddleware ,userRoleMiddleware , cartServices.createCarts);
router.patch("/:id",  authenticateMiddleware ,userRoleMiddleware , cartServices.updateCarts);
router.delete("/:id",  authenticateMiddleware ,userRoleMiddleware , cartServices.deleteCarts);

module.exports = router;