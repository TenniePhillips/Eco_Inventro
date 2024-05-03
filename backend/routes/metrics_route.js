const {
  getInventoryData,
  getOverview,
  getMaterialOverview,
  getDailyTransactions,
} = require("../controller/metrics_controller");

const router = require("express").Router();

router.get("/getInventroy_chart", getInventoryData);
router.get("/overview", getOverview);
router.get("/material_overview", getMaterialOverview);
router.get("/daily_transaction", getDailyTransactions);

module.exports = router;
