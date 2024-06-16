
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} =  require("../controller/user.controler.js");
const { authUser } = require("../middleware/auth.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUserProfile);

// export default router;
module.exports = router