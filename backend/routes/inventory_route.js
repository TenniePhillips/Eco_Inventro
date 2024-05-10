const {
  createInventory,
  deleteInventroy,
  fetchAllInventory,
  inventoryOverview,
  recentInventory,
  checkBalanceOverview,
  updateInventory,
  checkDeliveredTotal,
} = require("../controller/inventroy_controller");
const { protect } = require("../middleware/auth_middleware");

const router = require("express").Router();

router.post("/create", protect, createInventory);
router.delete("/delete/:id", protect, deleteInventroy);
router.get("/fetch", protect, fetchAllInventory);
router.get("/overview", protect, inventoryOverview);
router.get("/recent_inventory", protect, recentInventory);
router.get("/check-balance", protect, checkBalanceOverview);
router.patch("/update_status/:id", protect, updateInventory);
router.get("/check_delivered", protect, checkDeliveredTotal);

module.exports = router;
