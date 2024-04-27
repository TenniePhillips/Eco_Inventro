const {
  createInventory,
  deleteInventroy,
} = require("../controller/inventroy_controller");

const router = require("express").Router();

router.post("/create", createInventory);
router.post("/delete", deleteInventroy);

module.exports = router;
