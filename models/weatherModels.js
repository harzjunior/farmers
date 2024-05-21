const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  precipitation: Number,
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
