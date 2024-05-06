const {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
  inventoryOverview,
  // dailyInventryOverview,
  recentInventory,
} = require("../controller/inventroy_controller");

const router = require("express").Router();

router.post("/create", createInventory);
router.delete("/delete/:id", deleteInventroy);
router.get("/fetch", fetchAllInventory);
router.get("/overview", inventoryOverview);
router.get("/recent_inventory", recentInventory);

module.exports = router;
