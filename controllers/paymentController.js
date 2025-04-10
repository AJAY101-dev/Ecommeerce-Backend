const express = require("express");
const {paymentService} = require("../services/paymentServices");
const paymentMiddleware = require("../middlewares/paymentMiddleware");


const router = express.Router();

router.post("/",paymentMiddleware,paymentService)
module.exports = router;
