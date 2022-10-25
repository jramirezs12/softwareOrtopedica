const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const courseSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

courseSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const course = mongoose.model("course", courseSchema);
module.exports = course;
