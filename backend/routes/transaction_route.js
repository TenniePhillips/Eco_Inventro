const {
  fetchAllTransaction,
  createTransaction,
  deleteTransaction,
  sumTotalOfMaterial,
  sumRecycledMaterial,
} = require("../controller/transactionController");

const router = require("express").Router();

router.post("/create", createTransaction);
router.get("/fetch", fetchAllTransaction);
router.delete("/delete/:id", deleteTransaction);
router.get("/sum_transaction", sumTotalOfMaterial);
router.get("/recycled", sumRecycledMaterial);

module.exports = router;
