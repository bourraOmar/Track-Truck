const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const { verifyToken, protectRoute } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.post('/', protectRoute(['Admin']), tripController.createTrip);
router.get('/', protectRoute(['Admin']), tripController.getAllTrips);
router.delete('/:id', protectRoute(['Admin']), tripController.deleteTrip);

router.get('/my-trips', tripController.getDriverTrips);
router.put('/:id', tripController.updateTrip);
router.get('/:id/pdf', tripController.getMissionOrderPDF);

module.exports = router;
