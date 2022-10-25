const express = require("express");
const router = express.Router();
const MatterController = require("../controllers/matter");
const Auth = require("../middleware/auth");
const ValidateMatter = require("../middleware/validateMatter");


router.post("/registerMatter", MatterController.registerMatter);
router.post("/login", MatterController.login);
router.get(
  "/listMatters/:name?",
  Auth,
  ValidateMatter,
  MatterController.listMatter
);
router.put("/updateMatter", Auth, ValidateMatter, MatterController.updateMatter);
router.put("/deleteMatter", Auth, ValidateMatter, MatterController.deleteMatter);

module.exports = router;
