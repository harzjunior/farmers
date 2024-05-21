const { mongoose } = require("mongoose");
const farmMod = require("../models/farmModels");

exports.getAllFarms = async (req, res) => {
  try {
    const farms = await farmMod.find();
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFarmById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }
  try {
    const farm = await farmMod.findById(id);
    if (farm) {
      res.json(farm);
    } else {
      res.status(404).json({ message: "Farm not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFarm = async (req, res) => {
  const farm = new farmMod({
    name: req.body.name,
    location: req.body.location,
    size: req.body.size,
    farmer: req.body.farmer, // Assuming farmer ID is provided in the request body
  });

  try {
    const newFarm = await farm.save();
    res.status(201).json(newFarm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFarm = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const farm = await farmMod.findById(id);
    if (farm) {
      farm.name = req.body.name;
      farm.location = req.body.location;
      farm.size = req.body.size;
      farm.farmer = req.body.farmer; // Assuming farmer ID is provided in the request body

      const updatedFarm = await farm.save();
      res.json(updatedFarm);
    } else {
      res.status(404).json({ message: "Farm not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFarm = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const farm = await farmMod.findById(id);
    if (farm) {
      await farm.remove();
      res.json({ message: "Farm deleted" });
    } else {
      res.status(404).json({ message: "Farm not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
