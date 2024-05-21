const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
