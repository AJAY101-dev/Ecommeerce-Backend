const express = require("express");
const router = express.Router();
const emailServices = require("../services/emailServices");

router.post("/", emailServices.sendMailNow);
router.post("/forgetpassword", emailServices.forgetPassword);
router.post("/updatepassword",emailServices.updatePassword);

module.exports = router;
