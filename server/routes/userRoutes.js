const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const { register, login } = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

module.exports = router;
