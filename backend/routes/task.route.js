const express = require("express");
const {
  addTask,
  removeTask,
  getTasks,
  updateTask,
} =  require("../controller/task.controller.js");
const { authUser } = require("../middleware/auth.js");

const router = express.Router();

router.post("/add", authUser, addTask);
router.put("/update", authUser, updateTask);
router.delete("/remove", authUser, removeTask);
router.get("/all", authUser, getTasks);

module.exports = router
// export default router;