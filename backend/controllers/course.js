const bcrypt = require("bcrypt");
const Course = require("../models/course");
const mongoose = require("mongoose");

const registerCourse = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let existingCourse = await Course.findOne({ name: req.body.name });
  if (existingCourse)
    return res.status(400).send("The course is already registered");

  let course = new Course({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await course.save();
  if (!result) return res.status(400).send("Failed to register course");
  try {
    let jwtToken = course.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const login = async (req, res) => {
  let course = await Course.findOne({ email: req.body.email });
  if (!course) return res.status(400).send("Wrong email or password");

  if (!course.dbStatus) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = course.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listCourse = async (req, res) => {
  let courses = await Course.find({ name: new RegExp(req.params["name"], "i") });
  if (!courses || courses.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ courses });
};

const updateCourse = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");


  let course = await Course.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description
  });

  if (!course) return res.status(400).send("Error editing course");
  return res.status(200).send({ course });
};

const deleteCourse = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let course = await Course.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!course) return res.status(400).send("Error delete course");
  return res.status(200).send({ course });
};



module.exports = {
  registerCourse,
  login,
  listCourse,
  updateCourse,
  deleteCourse
};
