const express = require("express");
const { createSubscription, subscriptionList, subscriptionCancel,cancelUserSubscriptionAfter5Minutes } = require("../services/subscriptionServices");
const { validLogin } = require("../services/userServices");
const subscriptionDeleteMiddleware = require("../middlewares/subscriptionDeleteMiddleware");
const router = express.Router();




router.post("/",createSubscription);
router.get("/", subscriptionList);
router.delete("/",subscriptionDeleteMiddleware, subscriptionCancel);
// router.post('/cron', cancelUserSubscriptionAfter5Minutes);


module.exports=router;