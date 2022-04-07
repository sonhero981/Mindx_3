const express = require("express");
const router = express.Router();
const validateInput = require("../../middleware/validateInput.js");
const { loginSchema, registerSchema } = require("./auth.validation");

const authController = require("./auth.controller");
const checkRole = require("../../middleware/checkRole.js");

router.post(
  "/register",
  validateInput(registerSchema, "body"),
  authController.register
);
router.post(
  "/login",
  validateInput(loginSchema, "body"),
  authController.login
);

module.exports = router;
