const { Router } = require("express");
const { check } = require("express-validator");
const {
  bookingGet,
  bookingPost,
  bookingPut,
  bookingDelete,
} = require("../controllers/booking_ads");
const { fieldValidate } = require("../middleware/field-validation");

const router = Router();

// Validation rules for the POST request
const bookingValidationRules = [
  check("petInfo.type", "Pet Type is required").notEmpty(),
  check("petInfo.age", "Pet Age is required").notEmpty(),
  check("petInfo.behavior", "Pet Behavior is required").notEmpty(),
  check("dates.startDate", "Start Date is required").notEmpty(),
  check("dates.endDate", "End Date is required").notEmpty(),
  check(
    "dates.selectedDates",
    "Selected Dates should be an array of dates"
  ).isArray(),
  check("hostDetails.name", "Host Name is required").notEmpty(),
  check("hostDetails.location", "Host Location is required").notEmpty(),
  check(
    "hostDetails.pricePerNight",
    "Price per Night is required and should be a number"
  )
    .notEmpty()
    .isNumeric(),
  check("hostDetails.images", "Images should be an array").isArray(),
  check(
    "hostDetails.additionalServices",
    "Additional Services should be an array"
  ).isArray(),
  check("paymentData", "Payment Data is required").notEmpty(),
];

// POST route to create a new booking
router.post(
  "/create_booking",
  bookingValidationRules, // Add validation rules
  fieldValidate, // Middleware to handle validation errors
  bookingPost // Controller to handle the request
);

// GET route to fetch bookings
router.get("/get_bookings", bookingGet);

// PUT route to update a booking by ID
router.put(
  "/update_booking/:id",
  bookingValidationRules, // Reuse validation rules for updating
  fieldValidate, // Middleware to handle validation errors
  bookingPut // Controller to handle the request
);

// DELETE route to delete a booking by ID
router.delete("/delete_booking/:id", bookingDelete);

module.exports = router;

// /api/bookings/create_booking
