const express = require("express");
const webHookSubscription = require("../services/webhookServices");
const webHookController = express();
webHookController.use(express.raw({ type: "application/json" }));
webHookController.post("/", webHookSubscription)
module.exports = webHookController