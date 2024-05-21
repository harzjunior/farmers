const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.getAllWeatherData);
router.get("/:id", weatherController.getWeatherDataById);
router.post("/", weatherController.createWeatherData);
router.put("/:id", weatherController.updateWeatherData);
router.delete("/:id", weatherController.deleteWeatherData);

module.exports = router;
