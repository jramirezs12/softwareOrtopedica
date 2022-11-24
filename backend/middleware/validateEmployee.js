const Employee = require("../models/employee");
const mongoose = require("mongoose");

const employee = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.employee._id);
  if (!validId) return res.status(400).send("Invalid id");

  let employee = await Employee.findById(req.employee._id);

  if (!employee) return res.status(400).send("Employee without permission");
  next();
};

module.exports = employee;
