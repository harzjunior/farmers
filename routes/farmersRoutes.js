const express = require("express");
const router = express.Router();
const farmersController = require("../controllers/farmersController");

router.get("/", farmersController.getAllFarmers);
router.get("/:id", farmersController.getFarmerById);
router.post("/", farmersController.createFarmer);
router.put("/:id", farmersController.updateFarmer);
router.delete("/:id", farmersController.deleteFarmer);

module.exports = router;
