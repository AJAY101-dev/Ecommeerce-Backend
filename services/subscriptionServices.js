const Stripe = require("stripe");
const User = require("../models/userModel");

const cron = require("node-cron")

const env = require("dotenv")
require('dotenv').config();


const { trusted } = require("mongoose");
const stripe = new Stripe(
  process.env.STRIPE_SK
);
const createSubscription = async (req, res) => {
  const { customerId, priceId } = req.body;
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: priceId,
      },
    ],
  });
  const user = await User.findOneAndUpdate(
    { customerId: customerId }, 
    { isSubscribed: true }, 
    { new: true } 
  );
  res.status(201).send({status:201, message:"Subscribe Successfully"})
};


const subscriptionList = async (req,res)=>
{
    const subscriptions = await stripe.subscriptions.list({
        limit: 3,
      });

      res.status(201).send({status:201, data:subscriptions})
      
}

const subscriptionCancel =  async (req,res) =>
{
try {
  const customerId = req.customerId;
     const {subsId} =  req.body
    const subscription = await stripe.subscriptions.cancel(
        subsId
      );
      const user = await User.findOneAndUpdate(
        { customerId: customerId }, 
        { isSubscribed: false }, 
        { new: true } 
      );
      if (!user) {
        return res.status(404).json({ message: "no such user  found" });
      }
     
      
      res.status(200).send({status:200, message:" subscription canceled ... "})
} catch (error) {

   res.status(401).send({status:401, message: error.message})
}
}






const job = cron.schedule('*/1 * * * *', async () => {

  try {
console.log("hello this is the cron job scheduler ")
    const customerId = "cus_S3ri8BnXeXR9ZK"
   
    const subscriptions = await stripe.subscriptions.list({limit:40})
    const subscriptionId = subscriptions.data.find(sub => sub.customer === customerId);

    
     
      await stripe.subscriptions.cancel(subscriptionId.id);
      

       await User.findOneAndUpdate(
      { customerId: customerId }, 
      { isSubscribed: false }, 
      { new: true } 
    );
      console.log(` Subscription canceled for user `);
  } catch (error) {
    console.error(`Error canceling subscription for customerId ${customerId}:`, error.message);
  }

});


job.start();

module.exports = {createSubscription,subscriptionList , subscriptionCancel , };
