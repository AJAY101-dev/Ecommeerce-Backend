
const env = require("dotenv")
require('dotenv').config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SK);

const orderPaymentService = async (amount, payment_method_types, customerId) => {
  try {
    let paymentMethods = [];

    // Set payment methods based on the type
    if (payment_method_types === "card") {
      paymentMethods = ["card"];
    } else if (payment_method_types === "upi") {
      paymentMethods = ["upi"];
    } else if (payment_method_types === "wallet") {
      paymentMethods = ["card", "upi", "link", "alipay", "wechat_pay"];
    } else {
      return "Invalid payment method";
    }

    // Step 1: Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to the smallest currency unit
      currency: "INR",
      payment_method_types: paymentMethods,
      customer: customerId,
    });

    // Step 2: Attach payment method (example with card)
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "tok_visa", // Replace with actual token in production
      },
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId,
    });

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    });

    // Step 3: Confirm payment
    const paymentIntentConfirm = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (paymentIntentConfirm.status === "succeeded") {
      return "Payment successful";
    } else {
      return "Payment failed";
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

module.exports = { orderPaymentService };
