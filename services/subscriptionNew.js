// const stripe = require("stripe");
// const User = require("../models/userModel");

// const cron = require("node-cron");

// const stripe = new Stripe(
//   "sk_test_51R8hoxPQWvRuig7xWD2lkLfeqdbIkvFf50t09p1vY79FrPF3aTje1hHFdiQkDmfKE8dMmO90VoP28OMFczV9QizZ00oCRxwLRe"
// );

// const createSubscription = async (req, res) => {
//   const { customerId, priceId } = req.body;
//   const subscription = await stripe.subscriptions.create({
//     customer: customerId,
//     items: [
//       {
//         price: priceId,
//       },
//     ],
//   });

//   const user = await User.findOneAndUpdate(
//     { customerId: customerId },
//     { isSubscribed: true },
//     { new: true }
//   );
//   res
//     .status(201)
//     .send({ status: 201, message: " subscription created successfully " });
// };

// const subscriptionList = async (req, res) => {
//   const subscriptions = await stripe.subscriptions.list({
//     limit: 3,
//   });
//   res
//     .status(201)
//     .send({ status: 201, message: " subscriptions list is below  " });
// };

// const subscriptionCancel = async (req, res) => {
//   try {
//     const customerId = req.body.customerId;
//     const { subsId } = req.body;
//     const subscription = await stripe.subscriptions.cancel(subsId);

//     const user = await User.findOneAndUpdate(
//       { customerId: customerId },
//       { isSubscribed: false },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).send({ message: " no such user is found " });
//     }

//     res.status(201).send({ message: "subscription is canceled successfully " });
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// };

// module.exports = { createSubscription, subscriptionList, subscriptionCancel };
