const Stripe = require("stripe");
const User = require("../models/userModel");

const stripe = new Stripe(
  "sk_test_51R8hoxPQWvRuig7xWD2lkLfeqdbIkvFf50t09p1vY79FrPF3aTje1hHFdiQkDmfKE8dMmO90VoP28OMFczV9QizZ00oCRxwLRe"
);

const webHookSubscription = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        "whsec_5ytZ4Q6XkigNbwnltO7rGHdURHIRfsFf"
      );
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