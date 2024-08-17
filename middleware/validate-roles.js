const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token",
    });
  }

  const { name, role } = req.user;

  if (role !== "ADMIN_ROLE" || role !== "SUPER_ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede ejecutar esta acción`,
    });
  }

  next();
};

// This function verify the Role as above function does, the difference is above function is restricted to ADMIN or SUPER_ADMIN
// Use as a middleware within delete route and pass as many roles as is needed as arguments 
const itHasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  itHasRole,
};
