const Matter = require("../models/matter");
const mongoose = require("mongoose");

const matter = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.matter._id);
  if (!validId) return res.status(400).send("Invalid id");

  let matter = await Matter.findById(req.matter._id);

  if (!matter) return res.status(400).send("Matter without permission");
  next();
};

module.exports = matter;
