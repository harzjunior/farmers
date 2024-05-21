const { mongoose } = require("mongoose");
const pestMod = require("../models/pestModels");

exports.getAllPests = async (req, res) => {
  try {
    const pest = await pestMod.find();
    res.json(pest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPestById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }
  try {
    const pest = await pestMod.findById(id);
    if (pest) {
      res.json(pest);
    } else {
      res.status(404).json({ message: "Pest not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPest = async (req, res) => {
  const pest = new pestMod({
    name: req.body.name,
    description: req.body.description,
    controlMethods: req.body.controlMethods,
    affectedCrops: req.body.affectedCrops, // Assuming crop IDs are provided in the request body
  });

  try {
    const newPest = await pest.save();
    res.status(201).json(newPest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePest = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const pest = await pestMod.findById(id);
    if (pest) {
      pest.name = req.body.name;
      pest.description = req.body.description;
      pest.controlMethods = req.body.controlMethods;
      pest.affectedCrops = req.body.affectedCrops; // Assuming crop IDs are provided in the request body

      const updatedPest = await pest.save();
      res.json(updatedPest);
    } else {
      res.status(404).json({ message: "Pest not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePest = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const pest = await pestMod.findById(id);
    if (pest) {
      await pest.remove();
      res.json({ message: "Pest deleted" });
    } else {
      res.status(404).json({ message: "Pest not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
