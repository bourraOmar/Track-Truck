const Tire = require('../models/Tire.model');
const Vehicle = require('../models/Vehicle.model');
const { catchHandler: catchAsync } = require('../utils/catchAsync');

exports.getAllTires = catchAsync(async (req, res) => {
  const tires = await Tire.find().populate('currentVehicle', 'plateNumber brand model');
  res.status(200).json(tires);
});

exports.createTire = catchAsync(async (req, res) => {
  const tire = await Tire.create(req.body);
  res.status(201).json(tire);
});

exports.updateTire = catchAsync(async (req, res) => {
  const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tire) return res.status(404).json({ message: 'Pneu non trouvé' });
  res.status(200).json(tire);
});

exports.deleteTire = catchAsync(async (req, res) => {
  const tire = await Tire.findByIdAndDelete(req.params.id);
  if (!tire) return res.status(404).json({ message: 'Pneu non trouvé' });
  res.status(200).json({ message: 'Pneu supprimé' });
});

exports.mountTire = catchAsync(async (req, res) => {
  const { vehicleId, position } = req.body;
  const tire = await Tire.findById(req.params.id);
  
  if (!tire) return res.status(404).json({ message: 'Pneu non trouvé' });
  if (tire.status === 'Mounted') return res.status(400).json({ message: 'Ce pneu est déjà monté' });

  // Check if position is occupied on the vehicle
  const existingTire = await Tire.findOne({ currentVehicle: vehicleId, position, status: 'Mounted' });
  if (existingTire) {
    return res.status(400).json({ message: `La position ${position} est déjà occupée sur ce véhicule` });
  }

  tire.status = 'Mounted';
  tire.currentVehicle = vehicleId;
  tire.position = position;
  await tire.save();

  res.status(200).json(tire);
});

exports.dismountTire = catchAsync(async (req, res) => {
  const tire = await Tire.findById(req.params.id);
  
  if (!tire) return res.status(404).json({ message: 'Pneu non trouvé' });
  if (tire.status !== 'Mounted') return res.status(400).json({ message: 'Ce pneu n\'est pas monté' });

  tire.status = 'InStock';
  tire.currentVehicle = null;
  tire.position = null;
  await tire.save();

  res.status(200).json(tire);
});
