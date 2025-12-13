const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const { verifyToken, protectRoute } = require('../middleware/auth.middleware');

router.use(verifyToken);

router.get('/dashboard', protectRoute(['Admin']), statsController.getDashboardStats);

module.exports = router;
