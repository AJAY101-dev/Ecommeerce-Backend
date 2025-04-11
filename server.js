const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv")
require('dotenv').config();

const systemRoutes = require("./routes/systemRoutes");
const webHookController = require("./controllers/webHookController");
console.log(process.env.EMAIL_PASS);
const app = express();
env.config();
app.use(express.static('uploads'));

app.use("/webhook", express.raw({ type: "application/json" }), webHookController );
app.use(express.json());
app.use("/",systemRoutes)
const mongoDb = async () =>
  { 
    // console.log(process.env.DATABASE)
     try {
         await mongoose.connect(process.env.DATABASE);
         console.log(" connection done ")
         
     } catch (error) {
          console.log(` mongo db connection error ${error}`);
     }
  } 

mongoDb()
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error during server startup:", error);
  });
