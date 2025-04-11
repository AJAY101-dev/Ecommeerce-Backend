const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true, // Ensures the email is unique
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager"],
      default: "user",
    },
    phoneNumber: {
      type: String,
      // required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },

    customerId: { type: String },
    isSubscribed: { type: Boolean, default: false },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    otp: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
