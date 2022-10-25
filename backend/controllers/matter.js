const bcrypt = require("bcrypt");
const Matter = require("../models/matter");
const mongoose = require("mongoose");

const registerMatter = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let existingMatter = await Matter.findOne({ name: req.body.name });
  if (existingMatter)
    return res.status(400).send("The matter is already registered");

  let matter = new Matter({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await matter.save();
  if (!result) return res.status(400).send("Failed to register matter");
  try {
    let jwtToken = matter.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Token generation failed");
  }
};

const login = async (req, res) => {
  let matter = await Matter.findOne({ email: req.body.email });
  if (!matter) return res.status(400).send("Wrong email or password");

  if (!matter.dbStatus) return res.status(400).send("Wrong email or password");

  try {
    let jwtToken = matter.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
};

const listMatter = async (req, res) => {
  let matters = await Matter.find({ name: new RegExp(req.params["name"], "i") });

  if (!matters || matters.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ matters });
};

const updateMatter = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let pass = "";

  let matterFind = await Matter.findOne({ name: req.body.name });
  
  let matter = await Matter.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description
  });

  if (!matter) return res.status(400).send("Error editing matter");
  return res.status(200).send({ matter });
};

const deleteMatter = async (req, res) => {
  if (!req.body._id) return res.status(400).send("Incomplete data");

  let matter = await Matter.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  if (!matter) return res.status(400).send("Error delete matter");
  return res.status(200).send({ matter });
};


module.exports = {
  registerMatter,
  login,
  listMatter,
  updateMatter,
  deleteMatter
};
