const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { fieldValidate } = require("../middleware/field-validation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    fieldValidate,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "El token de google es obligatorio").notEmpty(),
    fieldValidate,
  ],
  googleSignIn
);

module.exports = router;
