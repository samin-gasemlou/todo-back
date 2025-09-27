const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskModel = new mongoose.Schema({
  tid: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  // فیلد تاریخ فقط روز
  date: { type: String, required: true },
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true} //صاحب تسک
}, { timestamps: true }); // createdAt و updatedAt خودکار

module.exports = mongoose.model('Task', taskModel);