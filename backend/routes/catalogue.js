const express = require("express");
const router = express.Router();
const CatalogueController = require("../controllers/catalogue");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/ValidateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/saveProduct", CatalogueController.saveProduct);
router.get("/listProduct", CatalogueController.listProduct);
router.put("/updateProduct", CatalogueController.updateProduct);
router.delete(
  "/deleteProduct",
  Auth,
  ValidateUser,
  CatalogueController.deleteProduct
);
router.post(
  "/saveProductImg",
  mult,
  Upload,
  Auth,
  ValidateUser,
  CatalogueController.saveProductImg
);

module.exports = router;
