const { mongoose } = require("mongoose");
const taskMod = require("../models/taskModels");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskMod.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const task = await taskMod.findById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  const task = new taskMod({
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    farm: req.body.farm, // Assuming farm ID is provided in the request body
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const task = await taskMod.findById(id);
    if (task) {
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      task.farm = req.body.farm; // Assuming farm ID is provided in the request body

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const task = await taskMod.findById(id);
    if (task) {
      await task.remove();
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
