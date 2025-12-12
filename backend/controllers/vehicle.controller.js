const Vehicle = require("../models/Vehicle.model");

exports.createVehicle = async (req, res, next) => {
  try {
    const { plateNumber, brand, model, vehicleType, fuelType, maxLoad } =
      req.body;

    const exists = await Vehicle.findOne({ plateNumber });
    if (exists) {
      res.status(400);
      const error = new Error(
        "Un véhicule avec cette plaque d'immatriculation existe déjà."
      );
      error.status = 400;
      next(error);
      return;
    }
    const vehicle = await Vehicle.create({
      plateNumber,
      brand,
      model,
      vehicleType,
      fuelType,
      maxLoad,
    });

    res.status(200).json(vehicle);
  } catch (error) {
    next(error)
  }
};

exports.getVehicles = async (req, res, next) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });
  res.status(200).json(vehicles);
};

exports.getVehicleById = async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({ message: "Véhicule non trouvé." });
  }

  res.status(200).json(vehicle);
};

exports.updateVehicle = async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return res
      .status(404)
      .json({ message: "Véhicule non trouvé pour la modification." });
  }

  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedVehicle);
};

exports.deleteVehicle = async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if (!vehicle) {
    return res
      .status(404)
      .json({ message: "Véhicule non trouvé pour la suppression." });
  }

  res
    .status(200)
    .json({ message: "Véhicule supprimé avec succès", id: req.params.id });
};
