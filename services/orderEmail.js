const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "breakstrust@gmail.com",
    pass: "lunmtkyrkmortfdk",
  },
});

// Configure Handlebars for email templates
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  })
);

// Function to send order confirmation email
const orderMail = async ({ to, subject, name, orderId, totalPrice, items }) => {
  try {
    await transporter.sendMail({
      from: "noreply@gmail.com",
      to,
      subject,
      template: "order", // Ensure there's an 'order.hbs' in the 'views' folder
      context: {
        name,
        orderId,
        totalPrice,
        items,
      },
    //   attachments: [
    //     {
    //       filename: "Hello.jpeg",
    //     //   path: "/home/keymouseit/Desktop/AssigmentBackend/uploads/users/1743077385247-download.jpeg",
    //       cid: "logo",
    //     },
    //   ],
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = orderMail;
