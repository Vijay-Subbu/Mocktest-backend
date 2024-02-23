const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/forgot-password", forgotPassword);
router.post("/api/reset-password", resetPassword);

module.exports = router;
