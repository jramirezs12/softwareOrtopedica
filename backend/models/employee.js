const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

employeeSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
