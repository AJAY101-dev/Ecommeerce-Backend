const Stripe = require("stripe");
const User = require("../models/userModel");


const env = require("dotenv")
require('dotenv').config();


const stripe = new Stripe(
  process.env.STRIPE_SK
);

const webHookSubscription = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      // console.log(req.body)
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.WEBHOOK_SECRET_KEY
      );
      // console.log(event)
      if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object;
        // console.log(subscription.customer)
        const customerId = subscription.customer;
        const user = await User.findOneAndUpdate(
          { customerId: customerId },
          {
            isSubscribe: false,
          }
        );
      }
      if (event.type === "customer.deleted") {
        const customerId = event.data.object.id;
        const user = await User.findOneAndUpdate(
          { customerId: customerId },
          {
            isSubscribe: false,
            customerId: null,
          }
        );
      }

      
    //   if (event.type === "refund.created") {
    //     const refund = event.data.object.status
    //   }
      res.status(200).send("Webhook received");
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send("Webhook Error");
    }
  };
  module.exports = webHookSubscription;