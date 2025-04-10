const express = require("express");
const sendPushNotification = require("../services/notificationServices");

console.log(" coming to the notification folder  folder ");


const router = express.Router();

router.post("/", sendPushNotification );
module.exports = router;
