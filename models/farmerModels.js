const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  farms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Farm" }],
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
