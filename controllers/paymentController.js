const express = require("express");
const {paymentService} = require("../services/paymentServices");


const router = express.Router();

router.post("/",paymentService)
module.exports = router;
