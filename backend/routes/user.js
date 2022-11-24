const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get(
  "/listUsers/:name?",
  UserController.listUser
);
router.put("/updateUser", UserController.updateUser);
router.put("/deleteUser",  UserController.deleteUser);


module.exports = router;
