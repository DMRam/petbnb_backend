const { response } = require("express");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Check email
    const user = await UserModel.findOne({ email });

    console.log(email + " EMAIL IN BACKEND");
    console.log(user + " USER IN BACKEND");
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password incorrectos - correo",
      });
    }
    // Check user status
    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos Usuario no Existe - false",
      });
    }
    // Check user password
    const validPassword = bcryptjs.compareSync(password, user.password);

    console.log(password + " ------***** ------ " + user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos Password incorrecto",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error + " Error en login controller");
    res.status(500).json({
      msg: "Something went wrong",
      error,
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, img, name } = await googleVerify(id_token);

    // Check email
    let user = await UserModel.findOne({ email });

    // Create user
    const data = {
      name,
      email,
      password: ":P",
      img,
      google: true,
    };

    if (!user) {
      user = new UserModel(data);
      await user.save();
    }

    // Check user status
    if (!user.status) {
      return res.status(400).json({
        msg: "Hable con el administardor - Usuario bloqueado",
      });
    }

    //  token --- MODIFIED 7 abril
    const token = await generateJWT(user.uid);

    console.log("*** User generated ***");
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error + " ERROR IN googleSignIn");
    res.status(500).json({
      msg: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
