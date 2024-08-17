const fieldValidate = require("../middleware/field-validation");
const validateJWT = require("../middleware/jwt-validate");
const roleValidate = require("../middleware/validate-roles");

module.exports = {
  ...fieldValidate,
  ...validateJWT,
  ...roleValidate,
};
