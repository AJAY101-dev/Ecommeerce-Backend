const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const TWILIO_ACCOUNT_SID = "AC8c88773a876141cc416fc0985226b082";
const TWILIO_AUTH_TOKEN = "c5918efb2fe029359708e62105c06eda";
const TWILIO_PHONE_NUMBER = +"14782494546";

// Initialize Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



const message = async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res
      .status(400)
      .json({ error: "Recipient number and message are required." });
  }

  try {
    const sms = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.status(200).json({
      success: true,
      messageSid: sms.sid,
      status: sms.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start the server

module.exports = { message };
