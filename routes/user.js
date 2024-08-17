const { Router } = require("express");
const { check } = require("express-validator");
const RoleSchema = require("../models/role");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  getUserByUid
} = require("../controllers/users");

const {
  isValidRole,
  existEmail,
  existUserById,
} = require("../helpers/db-validators");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");

const router = Router();

router.get("/", usersGet);

// Define the route for getting a tenant by email
router.get(
  "/uid/:uid",
  [check("uid", "No es un Id Válido").isMongoId(), fieldValidate],
  getUserByUid
);

router.put(
  "/:id",
  [
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    fieldValidate,
  ],
  usersPut
);

router.post(
  "/",
  [
    check("name", "El nombre ingresado no es válido").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio mayor a 6 caracteres"
    ).isLength({ min: 6 }),
    check("email").custom(existEmail),
    // Role is intrinsic passed thought isValidRole - One argument function
    check("role").custom(isValidRole),
    fieldValidate,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un Id Válido").isMongoId(),
    check("id").custom(existUserById),
    fieldValidate,
  ],
  usersDelete
);

module.exports = router;
