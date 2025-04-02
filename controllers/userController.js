const express = require("express");
const empControllers = require("../services/userServices");

console.log(" coming to the user user folder ");
// const empControllers = require("../controller/empController");

const router = express.Router();



router.post("/", empControllers.createEmployee);
router.post("/login", empControllers.validLogin);
router.get("/",empControllers.authenticateMiddleware, empControllers.getAllEmployees);
router.get("/search", empControllers.getAllEmployeesSearch);
router.get("/pagination", empControllers.getAllEmployeesPagination);
router.get("/:id", empControllers.getEmployeeById);
router.patch("/:id", empControllers.updateEmployee);
router.delete("/:id", empControllers.deleteEmployee);

module.exports = router;