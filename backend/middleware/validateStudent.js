const Student = require("../models/student");
const mongoose = require("mongoose");

const student = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.student._id);
  if (!validId) return res.status(400).send("Invalid id");

  let student = await Student.findById(req.student._id);

  if (!student) return res.status(400).send("Student without permission");
  next();
};

module.exports = student;
