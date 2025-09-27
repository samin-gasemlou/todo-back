const express = require('express');
const Task = require('../MODELS/Task');
const AuthMiddleware = require('../MIDDLEWARE/AuthMiddleware');
const router = express.Router();

router.get("/by-date/:date", AuthMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ 
      user: req.user.id, 
      date: req.params.date 
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;
