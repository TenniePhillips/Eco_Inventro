const {
  fetchAllTransaction,
  createTransaction,
} = require("../controller/transactionController");

const router = require("express").Router();

router.post("/create", createTransaction);
router.get("/fetch", fetchAllTransaction);

module.exports = router;
