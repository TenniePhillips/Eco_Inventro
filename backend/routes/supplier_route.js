const {
  createSupplier,
  deleteSupplier,
  fetchAllSupplier,
} = require("../controller/supplier_controller");

const router = require("express").Router();

router.post("/create", createSupplier);
router.delete("/delete/:id", deleteSupplier);
router.get("/fetch", fetchAllSupplier);

module.exports = router;
