const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle.controller");

router.route("/").post(createVehicle).get(getVehicles);

router
  .route("/:id")
  .get(getVehicleById)
  .put(updateVehicle)
  .delete(deleteVehicle);

module.exports = router;
