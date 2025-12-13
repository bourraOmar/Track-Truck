const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    status: {
      type: String,
      enum: ["Planned", "InProgress", "Completed", "Cancelled"],
      default: "Planned",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startMileage: { type: Number },
    endMileage: { type: Number },
    fuelConsumed: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
