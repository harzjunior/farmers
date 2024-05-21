const { mongoose } = require("mongoose");
const weatherMod = require("../models/weatherModels");

exports.getAllWeatherData = async (req, res) => {
  try {
    const weather = await weatherMod.find();
    res.json(weather);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWeatherDataById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }
  try {
    const weatherData = await weatherMod.findById(id);
    if (weatherData) {
      res.json(weatherData);
    } else {
      res.status(404).json({ message: "Weather data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWeatherData = async (req, res) => {
  const weatherData = new weatherMod({
    date: req.body.date,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    precipitation: req.body.precipitation,
    farm: req.body.farm, // Assuming farm ID is provided in the request body
  });

  try {
    const newWeatherData = await weatherData.save();
    res.status(201).json(newWeatherData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateWeatherData = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const weatherData = await weatherMod.findById(id);
    if (weatherData) {
      weatherData.date = req.body.date;
      weatherData.temperature = req.body.temperature;
      weatherData.humidity = req.body.humidity;
      weatherData.precipitation = req.body.precipitation;
      weatherData.farm = req.body.farm; // Assuming farm ID is provided in the request body

      const updatedWeatherData = await weatherData.save();
      res.json(updatedWeatherData);
    } else {
      res.status(404).json({ message: "Weather data not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteWeatherData = async (req, res) => {
  const id = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    const weatherData = await weatherMod.findById(id);
    if (weatherData) {
      await weatherData.remove();
      res.json({ message: "Weather data deleted" });
    } else {
      res.status(404).json({ message: "Weather data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
