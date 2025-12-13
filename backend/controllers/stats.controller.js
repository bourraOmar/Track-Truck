const Vehicle = require("../models/Vehicle.model");
const Trip = require("../models/Trip.model");
const { catchHandler: catchAsync } = require("../utils/catchAsync");

exports.getDashboardStats = catchAsync(async (req, res) => {
  const totalVehicles = await Vehicle.countDocuments();
  const maintenanceVehicles = await Vehicle.countDocuments({
    status: "Maintenance",
  });
  const activeTrips = await Trip.countDocuments({ status: "InProgress" });

  res.status(200).json({
    totalVehicles,
    maintenanceVehicles,
    activeTrips,
  });
});
