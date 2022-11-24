const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employee");
const Auth = require("../middleware/auth");
const ValidateEmployee = require("../middleware/validateEmployee");

router.post("/registerEmployee", EmployeeController.registerEmployee);
router.post("/login", EmployeeController.login);
router.get(
  "/listEmployees",
  EmployeeController.listEmployee
);
router.put("/updateEmployee", EmployeeController.updateEmployee);
router.put("/deleteEmployee", EmployeeController.deleteEmployee);

module.exports = router;
