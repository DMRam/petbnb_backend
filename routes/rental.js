const { Router } = require("express");
const { check } = require("express-validator");

const {
  rentalGet,
  rentalPut,
  rentalPost,
  rentalDelete,
} = require("../controllers/rental");

const {
  existRentalById,
  existRentalByAddress
} = require("../helpers/db-validators");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");

const router = Router();

router.get("/", rentalGet);

router.put(
  "/:id",
  [
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existRentalById),
    fieldValidate,
  ],
  rentalPut
);

router.post(
  "/",
  [
    check("systemName", "El nombre ingresado no es válido").not().isEmpty(),
    check(
      "ownerId",
      "El owner de un contrato debe ser un Id valido de mongo"
    ).isMongoId(),
    check("dateFrom").notEmpty(),
    check("dateTo").notEmpty(),
    check("address", 'La dirección ya tiene un contrato vigente').custom(existRentalByAddress),
    // Role is intrinsic passed thought isValidRole - One argument function
    fieldValidate,
  ],
  rentalPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existRentalById),
    fieldValidate,
  ],
  rentalDelete
);

module.exports = router;
