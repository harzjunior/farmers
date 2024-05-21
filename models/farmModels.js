const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  crops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crop" }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
