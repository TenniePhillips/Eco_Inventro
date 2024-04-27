const {
  createSupplier,
  deleteSupplier,
} = require("../controller/supplier_controller");

const router = require("express").Router();

router.post("/create", createSupplier);
router.post("/delete", deleteSupplier);

module.exports = router;
