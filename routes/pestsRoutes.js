const express = require("express");
const router = express.Router();
const pestsController = require("../controllers/pestsController");

router.get("/", pestsController.getAllPests);
router.get("/:id", pestsController.getPestById);
router.post("/", pestsController.createPest);
router.put("/:id", pestsController.updatePest);
router.delete("/:id", pestsController.deletePest);

module.exports = router;
