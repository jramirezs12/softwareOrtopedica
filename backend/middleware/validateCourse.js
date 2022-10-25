const Course = require("../models/course");
const mongoose = require("mongoose");

const course = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.course._id);
  if (!validId) return res.status(400).send("Invalid id");

  let course = await Course.findById(req.course._id);

  if (!course) return res.status(400).send("Course without permission");
  next();
};

module.exports = course;
