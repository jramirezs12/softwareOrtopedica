const bcrypt = require("bcrypt");
const Student = require("../models/student");
const mongoose = require("mongoose");

const registerStudent = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  let existingStudent = await Student.findOne({ email: req.body.email });
  if (existingStudent)
    return res.status(400).send("The student is already registered");

  let hash = await bcrypt.hash(req.body.password, 10);

  let student = new Student({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  let result = await student.save();
  if (!result) return res.status(400).send("Failed to register student");
  try {
    let jwtToken = student.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const login = async (req, res) => {
  let student = await Student.findOne({ email: req.body.email });
  if (!student) return res.status(400).send("Wrong email or password");

  if (!student.dbStatus) return res.status(400).send("Wrong email or password");

  let hash = await bcrypt.compare(req.body.password, student.password);
  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = student.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listStudent = async (req, res) => {
  let students = await Student.find({ name: new RegExp(req.params["name"], "i") });

  if (!students || students.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ students });
};

const updateStudent = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email)
    return res.status(400).send("Incomplete data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let studentFind = await Student.findOne({ email: req.body.email });
    pass = studentFind.password;
  }

  let student = await Student.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  });

  if (!student) return res.status(400).send("Error editing student");
  return res.status(200).send({ student });
};

const deleteStudent = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let student = await Student.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!student) return res.status(400).send("Error delete student");
  return res.status(200).send({ student });
};

module.exports = {
  registerStudent,
  login,
  listStudent,
  updateStudent,
  deleteStudent
};
