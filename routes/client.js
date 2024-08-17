const { Router } = require("express");
const { check } = require("express-validator");
const {
  clientsGet,
  clientsPut,
  clientsPost,
  clientsDelete,
  getClientByEmail,
  clientsPutEmail
} = require("../controllers/clients");

const { existClientsEmail } = require("../helpers/db-validators");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");

const router = Router();

router.get("/", clientsGet);

// Define the route for getting a tenant by email
router.get(
  "/email/:email",
  [check("email", "Email no válido").isEmail(), fieldValidate],
  getClientByEmail
);

router.put(
  "/:id",
  [check("id", "No es un Id Válido").isMongoId(), fieldValidate],
  clientsPut
);

router.put(
  "/email/:email",
  [check("email", "No es un Id Válido").isEmail(), fieldValidate],
  clientsPutEmail
);

router.post(
  "/",
  [
    check("name", "El nombre ingresado no es válido").not().isEmpty(),
    check("email").custom(existClientsEmail),
    fieldValidate,
  ],
  clientsPost
);

router.delete(
  "/email/:email",
  [
    // validateJWT,
    // isAdminRole,
    check("email", "No es un Id Válido").isEmail(),
    fieldValidate,
  ],
  clientsDelete
);

module.exports = router;
