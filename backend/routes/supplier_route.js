const {
  createSupplier,
  deleteSupplier,
  fetchAllSupplier,
} = require("../controller/supplier_controller");
const { protect } = require("../middleware/auth_middleware");

const router = require("express").Router();

router.post("/create", protect, createSupplier);
router.delete("/delete/:id", protect, deleteSupplier);
router.get("/fetch", protect, fetchAllSupplier);

module.exports = router;
