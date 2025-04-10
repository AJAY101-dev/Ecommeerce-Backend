const express = require("express");

const { message } = require("../services/messageServices");

const router = express.Router();
router.post("/", message)

module.exports = router;