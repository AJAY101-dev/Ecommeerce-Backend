const express = require("express");

console.log(" coming to the user product folder ");
const productServices = require("../services/productServices");
const empControllers = require("../services/userServices");
const roleMiddleware = require("../middlewares/roleMiddleware");



const router = express.Router();



router.get("/get",empControllers.authenticateMiddleware, roleMiddleware,productServices.getProducts);
router.post("/post",empControllers.authenticateMiddleware, roleMiddleware, productServices.createProducts);
router.patch("/:id",empControllers.authenticateMiddleware, roleMiddleware, productServices.updateProducts);
router.delete("/:id",empControllers.authenticateMiddleware, roleMiddleware, productServices.deleteProducts);
module.exports = router;