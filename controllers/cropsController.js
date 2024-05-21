const { mongoose } = require("mongoose");
const cropMod = require("../models/cropModels");

exports.getAllCrops = async (req, res) => {
  try {
    const crops = await cropMod.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCropById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const crop = await cropMod.findById(id);
    if (crop) {
      res.json(crop);
    } else {
      res.status(404).json({ message: "Crop not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCrop = async (req, res) => {
  try {
    // Validate request data
    const { name, variety, plantingDate, harvestDate, farm } = req.body;
    if (!name || !variety || !plantingDate || !harvestDate || !farm) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new Crop instance
    const crop = new cropMod({
      name,
      variety,
      plantingDate,
      harvestDate,
      status: req.body.status || "growing",
      farm,
    });

    // Save Crop to database
    const newCrop = await crop.save();
    res.status(201).json(newCrop);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCrop = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const crop = await cropMod.findById(id);
    if (crop) {
      crop.name = req.body.name;
      crop.variety = req.body.variety;
      crop.plantingDate = req.body.plantingDate;
      crop.harvestDate = req.body.harvestDate;
      crop.status = req.body.status;
      crop.farm = req.body.farm; // Assuming farm ID is provided in the request body

      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404).json({ message: "Crop not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCrop = async (req, res) => {
  const id = req.params.id;
  
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const result = await cropMod.deleteOne({ _id: id }); // Use deleteOne to remove the crop
    if (result.deletedCount > 0) {
      res.json({ message: "Crop deleted" });
    } else {
      res.status(404).json({ message: "Crop not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
