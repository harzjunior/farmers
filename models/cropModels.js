const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variety: String,
  plantingDate: { type: Date, required: true },
  harvestDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["growing", "harvested", "sold"],
    default: "growing",
  },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});

const Crop = mongoose.model("Crop", cropSchema);

module.exports = Crop;
