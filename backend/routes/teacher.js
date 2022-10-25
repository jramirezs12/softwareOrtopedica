const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacher");
const Auth = require("../middleware/auth");
const ValidateTeacher = require("../middleware/validateTeacher");

router.post("/registerTeacher", TeacherController.registerTeacher);
router.post("/login", TeacherController.login);
router.get(
  "/listTeachers/:name?",
  Auth,
  ValidateTeacher,
  TeacherController.listTeacher
);
router.put("/updateTeacher", Auth, ValidateTeacher, TeacherController.updateTeacher);
router.put("/deleteTeacher", Auth, ValidateTeacher, TeacherController.deleteTeacher);

module.exports = router;
