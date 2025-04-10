const express = require("express");

console.log(" coming to the uploads  folder ");

const uploadServices = require("../services/uploadServices");
const router = express.Router();

router.post("/", uploadServices.uploadFiles);

router.delete("/", uploadServices.deleteFile);
router.post("/csv", uploadServices.uploadFromCsvFile);

module.exports = router;
