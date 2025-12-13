const express = require("express");
const { register, login, getAllDrivers, createDriver } = require("../controllers/auth.controller");
const { catchHandler } = require("../utils/catchAsync");
const { verifyToken, protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

// router.post("/register", catchHandler(register)); // Disabled public registration
router.post("/login", catchHandler(login));
router.get("/drivers", verifyToken, protectRoute(['Admin']), catchHandler(getAllDrivers));
router.post("/drivers", verifyToken, protectRoute(['Admin']), catchHandler(createDriver));

module.exports = router;