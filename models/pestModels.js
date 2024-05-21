const mongoose = require("mongoose");

const pestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  controlMethods: [String],
  affectedCrops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crop" }],
});

const Pest = mongoose.model("Pest", pestSchema);

module.exports = Pest;
