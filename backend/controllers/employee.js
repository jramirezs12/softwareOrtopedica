const bcrypt = require("bcrypt");
const Teacher = require("../models/teacher");
const mongoose = require("mongoose");

const registerTeacher = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  let existingTeacher = await Teacher.findOne({ email: req.body.email });
  if (existingTeacher)
    return res.status(400).send("The teacher is already registered");

  let hash = await bcrypt.hash(req.body.password, 10);

  let teacher = new Teacher({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  let result = await teacher.save();
  if (!result) return res.status(400).send("Failed to register teacher");
  try {
    let jwtToken = teacher.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const login = async (req, res) => {
  let teacher = await Teacher.findOne({ email: req.body.email });
  if (!teacher) return res.status(400).send("Wrong email or password");

  if (!teacher.dbStatus) return res.status(400).send("Wrong email or password");

  let hash = await bcrypt.compare(req.body.password, teacher.password);
  if (!hash) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listTeacher = async (req, res) => {
  let teachers = await Teacher.find({ name: new RegExp(req.params["name"], "i") });
  if (!teachers || teachers.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ teachers });
};

const updateTeacher = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email)
    return res.status(400).send("Incomplete data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let teacherFind = await Teacher.findOne({ email: req.body.email });
    pass = teacherFind.password;
  }

  let teacher = await Teacher.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  });

  if (!teacher) return res.status(400).send("Error editing teacher");
  return res.status(200).send({ teacher });
};

const deleteTeacher = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let teacher = await Teacher.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!teacher) return res.status(400).send("Error delete user");
  return res.status(200).send({ user });
};

module.exports = {
  registerTeacher,
  login,
  listTeacher,
  updateTeacher,
  deleteTeacher
};
