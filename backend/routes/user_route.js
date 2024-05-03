const {
  login,
  register,
  fetchUsers,
  deleteUser,
} = require("../controller/user_controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/fetch", fetchUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
