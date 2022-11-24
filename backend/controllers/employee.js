const bcrypt = require("bcrypt");
const Employee = require("../models/employee");
const mongoose = require("mongoose");

const registerEmployee = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  let existingEmployee = await Employee.findOne({ email: req.body.email });
  if (existingEmployee)
    return res.status(400).send("The Employee is already registered");

  let hash = await bcrypt.hash(req.body.password, 10);

  let employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });

  let result = await employee.save();
  if (!result) return res.status(400).send("Failed to register employee");
  try {
    let jwtToken = employee.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const login = async (req, res) => {
  let employee = await Employee.findOne({ email: req.body.email });
  if (!employee) return res.status(400).send("Wrong email or password");

  
  let hash = await bcrypt.compare(req.body.password, employee.password);
  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listEmployee = async (req, res) => {
  let employees = await Employee.find({ name: new RegExp(req.params["name"], "i") });
  if (!employees || employees.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ employees : employees });
};

const updateEmployee = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email)
    return res.status(400).send("Incomplete data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let employeeFind = await Employee.findOne({ email: req.body.email });
    pass = employeeFind.password;
  }

  let employee = await Employee.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  });

  if (!employee) return res.status(400).send("Error editing employee");
  return res.status(200).send({ employee: employee });
};

const deleteEmployee = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let employee = await Employee.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!employee) return res.status(400).send("Error delete user");
  return res.status(200).send({ user });
};

module.exports = {
  registerEmployee: registerEmployee,
  login,
  listEmployee: listEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee
};
