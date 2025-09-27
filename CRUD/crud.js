const express = require('express');
const Task = require('../MODELS/Task');
const AuthMiddleware = require('../MIDDLEWARE/AuthMiddleware');
const router = express.Router();

//Create
router.post("/",AuthMiddleware, async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title,user:req.user.id ,date: new Date().toISOString().split("T")[0],});
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Read ---> All
router.get("/",AuthMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({user:req.user.id}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update
router.put("/:tid",AuthMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { tid: req.params.tid, user:req.user.id },
      { ...req.body },
      { new: true },
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete
router.delete("/:tid",AuthMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ tid: req.params.tid,user:req.user.id });
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", task: deletedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;