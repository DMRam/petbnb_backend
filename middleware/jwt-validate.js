const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("imm_user_token");

  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Read user with uid
    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no valido - Usuarion no existe en DB ",
      });
    }
    // Is user status true
    if (!user.status) {
      return res.status(401).json({
        msg: "Token no valido - Usuarion con estado false ",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validateJWT };
