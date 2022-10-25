const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/course");
const Auth = require("../middleware/auth");
const ValidateCourse = require("../middleware/validateCourse");


router.post("/registerCourse", CourseController.registerCourse);
router.post("/login", CourseController.login);
router.get(
  "/listCourses/:name?",
  Auth,
  ValidateCourse,
  CourseController.listCourse
);
router.put("/updateCourse", Auth, ValidateCourse, CourseController.updateCourse);
router.put("/deleteCourse", Auth, ValidateCourse, CourseController.deleteCourse);

module.exports = router;
