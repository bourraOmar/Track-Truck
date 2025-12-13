const express = require('express');
const router = express.Router();
const tireController = require('../controllers/tire.controller');
const { verifyToken, protectRoute } = require('../middleware/auth.middleware');

router.use(verifyToken);
router.use(protectRoute(['Admin'])); // Only admins manage tires

router.route('/')
  .get(tireController.getAllTires)
  .post(tireController.createTire);

router.route('/:id')
  .put(tireController.updateTire)
  .delete(tireController.deleteTire);

router.put('/:id/mount', tireController.mountTire);
router.put('/:id/dismount', tireController.dismountTire);

module.exports = router;
