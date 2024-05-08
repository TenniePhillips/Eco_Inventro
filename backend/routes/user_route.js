const {
  login,
  register,
  fetchUsers,
  deleteUser,
  createSubUser,
  fetchSubUsers,
  fetchAllSubUsers,
} = require("../controller/user_controller");
const { protect } = require("../middleware/auth_middleware");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/register-subuser", protect, createSubUser);
router.get("/fetch", fetchUsers);
router.get("/fetch-all-subusers", fetchAllSubUsers);
router.get("/fetch-subusers", protect, fetchSubUsers);
router.delete("/delete/:id", protect, deleteUser);

module.exports = router;
