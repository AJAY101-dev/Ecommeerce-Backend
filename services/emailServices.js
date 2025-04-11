const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


const env = require("dotenv")
require('dotenv').config();


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.USER_EMAIL_PASS,
  },
});

const sendMailNow = async (to, userName) => {
  const parentDir = path.resolve(__dirname, "..");
  const htmlPath = path.join(parentDir, "email.html");

  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  let personalizedHtml = htmlContent.replace(/{{username}}/g, userName);
  // const { to, subject, text } = req.body;

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: " user created !!!!",
    html: personalizedHtml,
  };
  await transporter.sendMail(mailOptions);
};

let storedOtp = "";



//  sending the otp to mail and in database 
async function sendOtpEmail(userEmail, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: USER_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

const forgetPassword = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const { email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { otp: otp },
      { new: true }
    );
    sendOtpEmail(email, otp);

    console.log(updatedUser);
  } catch (error) {
    res.status(400).json([{ statusCode: 400 }, console.log(error)]);
  }
};

//  validating password and updating it

async function passwordChanged(userEmail,password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: USER_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset successfully !!!!",
    text: `congratulations you updated your password . your new password is ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(" Password Reset successfully !!!!");
  } catch (error) {
    console.error("Error while updating the password :", error);
  }
}

const updatePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      console.log("User not found");
      return;
    } else if (user.otp == otp) {
      const plainPassword = password;
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      await User.findOneAndUpdate(
        { email },
        { password: hashedPassword ,
          otp: null ,
        },
       
        { new: true }
      );
      console.log(" password updated successfully ");
      passwordChanged(email,password);
    } else {
      console.log("otp is not verified !!!!");
      return;
    }

    console.log("User found:", user);
    return user;
  } catch (err) {
    console.error("Error finding user by email:", err);
    return null;
  }
};

module.exports = {
  sendMailNow,
  forgetPassword,
  updatePassword,
 };
