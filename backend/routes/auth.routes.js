const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { catchHandler } = require("../utils/catchAsync");

const router = express.Router();

router.post("/register", catchHandler(register));
router.post("/login", catchHandler(login));

module.exports = router;