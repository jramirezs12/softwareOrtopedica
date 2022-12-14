const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password){
    return res.status(400).send("Incomplete data");
  }
    
  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser){
    return res.status(400).send("The user is already registered");
  }
    
  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });

  let result = await user.save();
  if (!result){
    return res.status(400).send("Failed to register user");
  } 
  try {
    let jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
  res.redirect('/')
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Wrong email or password");

  let hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash) return res.status(400).send("Wrong password");

  try {
    let jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
  res.redirect('/')
};

const listUser = async (req, res) => {
  let users = await User.find({ name: new RegExp(req.params["name"], "i") });

  if (!users || users.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ students: users });
};

const updateUser = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email)
    return res.status(400).send("Incomplete data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let userFind = await User.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  let user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  });

  if (!user) return res.status(400).send("Error editing user");
  res.redirect('/')
  return res.status(200).send({ user: user });
};

const deleteUser = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let user = await User.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!user) return res.status(400).send("Error delete user");
  res.redirect('/')
  return res.status(200).send({ user: user });
};

module.exports = {
  registerUser: registerUser,
  login,
  listUser: listUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
