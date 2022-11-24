const Catalogue = require("../models/catalogue");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const saveProduct = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let catalogue = new Catalogue({
    name: req.body.name,
    description: req.body.description,
    productStatus: "libre",
  });

  let result = await catalogue.save();
  if (!result) return res.status(400).send("Error registering product");
  return res.status(200).send({ result });
};

const listProduct = async (req, res) => {
  let products = await Catalogue.find({ name: new RegExp(req.params["name"], "i") });

  if (!products || products.length === 0)
    return res.status(400).send("No search results");
  return res.status(200).send({ students: products });
};

const saveProductImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");
  console.log(req.files);
  let imageUrl = ""; //http://localhost:3001/uploads/2356477.png
  if (req.files !== undefined && req.files.image.type) {
    let url = req.protocol + "://" + req.get("host") + "/";
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }

  let catalogue = new Catalogue({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    productStatus: "libre",
    imageUrl: imageUrl,
  });

  let result = await catalogue.save();
  if (!result) return res.status(400).send("Error registering product");
  return res.status(200).send({ result });
};

const updateProduct = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.productStatus)
    return res.status(400).send("Incomplete data");

  let board = await Catalogue.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    productStatus: req.body.productStatus,
  });

  if (!catalogue) return res.status(400).send("product not found");
  return res.status(200).send({ board });
};

const deleteProduct = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let catalogue = await Catalogue.findByIdAndDelete(req.params._id);
  if (!catalogue) return res.status(400).send("Product not found");
  return res.status(200).send("Product deleted");
};

module.exports = { saveProduct: saveProduct, listProduct: listProduct, updateProduct: updateProduct, deleteProduct: deleteProduct, saveProductImg: saveProductImg };
