const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  upload,
} = require("../controllers/taskController");
router.post("/", auth, createTask);
//get all tasks
router.get("/", auth, getAllTasks);

// Get a task by id
router.get("/:id", auth, getTaskById);

// Update a task by id
router.patch("/:id", auth, updateTask);

// Delete a task by id
router.delete("/:id", auth, deleteTask);

router.post("/tasks/:id/upload", upload, async (req, res) => {
  res.send({ filename: req.file.filename });
});
module.exports = router;
