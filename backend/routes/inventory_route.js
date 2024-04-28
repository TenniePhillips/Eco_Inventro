const {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
} = require("../controller/inventroy_controller");

const router = require("express").Router();

router.post("/create", createInventory);
router.delete("/delete/:id", deleteInventroy);
router.get("/fetch", fetchAllInventory);

module.exports = router;
