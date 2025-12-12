const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: [true, "La plaque d'immatriculation est obligatoire"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    brand: {
      type: String,
      required: [true, "La marque est obligatoire"],
    },
    model: {
      type: String,
    },
    vehicleType: {
      type: String,
      enum: ["Truck", "Trailer"],
      required: [true, "Le type de véhicule est obligatoire"],
    },
    fuelType: {
      type: String,
      enum: ["Diesel", "Gasoline"],
      required: [true, "Le type de fuel est obligatoire"],
    },
    maxLoad: {
      type: Number,
      required: [true, "Le max load est obligatoire"],
      min: [0.1, "La charge maximale doit être positive"],
    },
    status: {
      type: String,
      enum: ["Operational", "Maintenance", "Inactive"],
      default: "Operational",
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle;
