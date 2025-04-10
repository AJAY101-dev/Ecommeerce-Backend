const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv")

const systemRoutes = require("./routes/systemRoutes");
const webHookController = require("./controllers/webHookController");

const app = express();
env.config();
app.use(express.static('uploads'));

app.use("/webhook", express.raw({ type: "application/json" }), webHookController );
app.use(express.json());
app.use("/",systemRoutes)
const mongoDb = async () =>
  { 
     try {
         await mongoose.connect('mongodb+srv://admin:admin123@cluster0.20mxo.mongodb.net/');
         console.log(" connection done ")
         
     } catch (error) {
          console.log(` mongo db connection error ${error}`);
     }
  } 

mongoDb()
  .then(() => {
    const port = 3009;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error during server startup:", error);
  });
