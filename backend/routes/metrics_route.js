const {
  getInventoryData,
  getOverview,
  getMaterialOverview,
  getDailyTransactions,
} = require("../controller/metrics_controller");
const { protect } = require("../middleware/auth_middleware");

const router = require("express").Router();

router.get("/getInventroy_chart", protect, getInventoryData);
router.get("/overview", protect, getOverview);
router.get("/material_overview", protect, getMaterialOverview);
router.get("/daily_transaction", protect, getDailyTransactions);

module.exports = router;
