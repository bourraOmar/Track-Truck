const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['InStock', 'Mounted', 'Discarded'],
    default: 'InStock'
  },
  condition: {
    type: String,
    enum: ['New', 'Good', 'Worn', 'Damaged'],
    default: 'New'
  },
  currentVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null
  },
  position: {
    type: String, // e.g., "Front-Left", "Rear-Right-Outer"
    default: null
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Tire', tireSchema);
