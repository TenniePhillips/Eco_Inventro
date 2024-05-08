const {
  fetchAllTransaction,
  createTransaction,
  deleteTransaction,
  sumTotalOfMaterial,
  sumRecycledMaterial,
} = require("../controller/transactionController");
const { protect } = require("../middleware/auth_middleware");

const router = require("express").Router();

router.post("/create", protect, createTransaction);
router.get("/fetch", protect, fetchAllTransaction);
router.delete("/delete/:id", protect, deleteTransaction);
router.get("/sum_transaction", protect, sumTotalOfMaterial);
router.get("/recycled", protect, sumRecycledMaterial);

module.exports = router;
