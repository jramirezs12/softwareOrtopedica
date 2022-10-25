const Teacher = require("../models/teacher");
const mongoose = require("mongoose");

const teacher = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.teacher._id);
  if (!validId) return res.status(400).send("Invalid id");

  let teacher = await Teacher.findById(req.teacher._id);

  if (!teacher) return res.status(400).send("Teacher without permission");
  next();
};

module.exports = teacher;
