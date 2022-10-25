const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student");
const Auth = require("../middleware/auth");
const ValidateStudent = require("../middleware/validateStudent");

router.post("/registerStudent", StudentController.registerStudent);
router.post("/login", StudentController.login);
router.get(
  "/listStudents/:name?",
  Auth,
  ValidateStudent,
  StudentController.listStudent
);
router.put("/updateStudent", Auth, ValidateStudent, StudentController.updateStudent);
router.put("/deleteStudent", Auth, ValidateStudent,  StudentController.deleteStudent);


module.exports = router;
