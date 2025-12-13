const Trip = require('../models/Trip.model');
const { catchHandler } = require('../utils/catchAsync');
const PDFDocument = require('pdfkit');

exports.createTrip = catchHandler(async (req, res) => {
  const trip = await Trip.create(req.body);
  res.status(201).json(trip);
});

exports.getAllTrips = catchHandler(async (req, res) => {
  const trips = await Trip.find()
    .populate('driver', 'firstName lastName email')
    .populate('vehicle', 'plateNumber brand model');
  res.status(200).json(trips);
});

exports.getDriverTrips = catchHandler(async (req, res) => {
  const trips = await Trip.find({ driver: req.user.id })
    .populate('vehicle', 'plateNumber brand model')
    .sort({ startDate: -1 });
  res.status(200).json(trips);
});

exports.updateTrip = catchHandler(async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  res.status(200).json(trip);
});

exports.deleteTrip = catchHandler(async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  res.status(200).json({ message: 'Trip deleted successfully' });
});

exports.getMissionOrderPDF = catchHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id)
    .populate('driver', 'firstName lastName email')
    .populate('vehicle', 'plateNumber brand model');

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  // Restrict access to the assigned driver only (no admins)
  if (trip.driver._id.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Only the assigned driver can download this mission order.' });
  }

  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=mission-order-${trip._id}.pdf`);

  doc.pipe(res);

  // Header
  doc.fontSize(25).text('ORDRE DE MISSION', { align: 'center' });
  doc.moveDown();
  
  // Trip Details
  doc.fontSize(12).text(`Référence: ${trip._id}`);
  doc.text(`Date d'émission: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  doc.fontSize(16).text('Détails du Trajet', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Départ: ${trip.departure}`);
  doc.text(`Arrivée: ${trip.arrival}`);
  doc.text(`Date de début: ${new Date(trip.startDate).toLocaleDateString()}`);
  doc.moveDown();

  // Driver Details
  doc.fontSize(16).text('Chauffeur', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Nom: ${trip.driver.lastName}`);
  doc.text(`Prénom: ${trip.driver.firstName}`);
  doc.moveDown();

  // Vehicle Details
  doc.fontSize(16).text('Véhicule', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Marque/Modèle: ${trip.vehicle.brand} ${trip.vehicle.model}`);
  doc.text(`Immatriculation: ${trip.vehicle.plateNumber}`);
  doc.moveDown();

  // Footer
  doc.moveDown(4);
  doc.fontSize(10).text('Signature du Responsable:', { align: 'right' });
  doc.moveDown(4);
  doc.text('Ce document sert d\'autorisation de circulation pour la mission spécifiée.', { align: 'center' });

  doc.end();
});
