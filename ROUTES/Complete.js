const express = require('express');
const Task = require('../MODELS/Task');
const AuthMiddleware = require('../MIDDLEWARE/AuthMiddleware');
const router = express.Router();

router.put('/:tid/complete', AuthMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ tid: req.params.tid, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.completed = !task.completed; // معکوس می‌کنیم
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;

