const express = require("express");

console.log(" coming to the user category folder ");
const categoryServices = require("../services/categoryServices");

const router = express.Router();

router.get("/get", categoryServices.getCategories);
router.post("/post", categoryServices.createCategories);
router.patch("/:id", categoryServices.updateCategories);
router.delete("/:id", categoryServices.deleteCategories);

module.exports = router;
