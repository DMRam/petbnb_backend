const { Router } = require("express");
const { check } = require("express-validator");
const { hostingAdPost } = require("../controllers/hosting_ads");
const { fieldValidate } = require("../middleware/field-validation");

const router = Router();

// Define validation rules for the POST request
const hostingAdValidationRules = [
  check("title", "Title is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("petTypes", "Pet Types should be an array").isArray(),
  check("selectedDays", "Selected Days is required").notEmpty(), // Adjust validation based on the actual type
  check("price", "Price is required and should be a string")
    .notEmpty()
    .isString(),
  check(
    "additionalServices",
    "Additional Services should be an array"
  ).isArray(),
  check("address", "Address is required").notEmpty(),
];

// POST route to create a new hosting ad
router.post(
  "/create_host_ads",
  hostingAdValidationRules, // Add validation rules
  fieldValidate, // Middleware to handle validation errors
  hostingAdPost // Controller to handle the request
);

module.exports = router;

// /api/host_ads/create_host_ads