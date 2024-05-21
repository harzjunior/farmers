const { mongoose } = require("mongoose");
const farmerMod = require("../models/farmerModels");

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await farmerMod.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFarmerById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const farmer = await farmerMod.findById(id);
    if (farmer) {
      res.json(farmer);
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFarmer = async (req, res) => {
  const farmer = new farmerMod({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  try {
    const newFarmer = await farmer.save();
    res.status(201).json(newFarmer);
  } catch (error) {
    console.error("Error Creating farmers data in MongoDB:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

exports.updateFarmer = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const farmer = await farmerMod.findById(id);
    if (farmer) {
      farmer.name = req.body.name;
      farmer.email = req.body.email;
      farmer.phone = req.body.phone;
      farmer.address = req.body.address;

      const updatedFarmer = await farmer.save();
      res.json(updatedFarmer);
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFarmer = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const farmer = await farmerMod.findById(id);
    if (farmer) {
      await farmer.remove();
      res.json({ message: "Farmer deleted" });
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
