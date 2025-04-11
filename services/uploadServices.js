const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")
const csv =  require("csvtojson")
const Stripe = require("stripe");
const User = require("../models/userModel");

const env = require("dotenv")
require('dotenv').config();

const stripe = new Stripe(
  process.env.STRIPE_SK
);

// const url = require("url")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let { folder } = req.query;
    if (!folder) {
      return cb(new Error("please Enter the name in the url", null));
    }
    const parentDir = path.resolve(__dirname, "..");
    console.log(parentDir);
    const uploadPath = path.join(parentDir, "uploads", folder);
    // console.log(uploadPath)
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});
const uploadFiles = (req, res) => {
  try {
    let { folder } = req.query;

    upload.array("file", 3)(req, res, function (err) {
      if (err) {
        return res.status(500).send({ status: 500, message: err.message });
      }
      res.status(200).send({
        status: 200,
        message: "File uploaded successfully",
        files: req.files.map((file) => ({
          url: `http://localhost:3005/${folder}/${file.filename}`,
          storedName: file.filename,
          filePath: file.path,
        })),
      });
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

//  using multer for deleting the image

const deleteFile = (req,res) => {
    const {folder, filename} = req.query
  const parentDir = path.resolve(__dirname, "..");

  const filePath = path.join(
    parentDir,
    "uploads",
    folder,
    filename
  );

  try {
    fs.unlinkSync(filePath); // Synchronous deletion, no callback
    res.send("File deleted successfully");
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).send("Error during file deletion");
  }
};



const uploadFromCsvFile = async (req, res) => {
  try {
    const parentDir = path.resolve(__dirname, "..");
    const uploadPath = path.join(parentDir, "uploads", "csv");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
    const upload = multer({
      storage,
      limits: { fileSize: 10 * 1024 * 1024 },
    }).single("file");
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ status: 400, message: "No file uploaded" });
      }
      const filePath = req.file.path;
      const jsonArray = await csv().fromFile(filePath);
      const createdEmployees = [];
      const failedEntries = [];
      for (const data of jsonArray) {
        try {
          if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
          }
          const customer = await stripe.customers.create({
            name: data.name,
            email: data.email,
          });
          data.customerId = customer.id;
          const createdEmployee = await User.create(data);
          createdEmployees.push(createdEmployee);
        } catch (err) {
          failedEntries.push({
            email: data.email,
            reason: err.message,
          });
        }
      }
      res.status(201).json({
        status: 201,
        message: `${createdEmployees.length} employees created successfully.`,
        created: createdEmployees,
        failed: failedEntries,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { uploadFiles, deleteFile , uploadFromCsvFile};
