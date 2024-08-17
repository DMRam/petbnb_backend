const { response, request } = require("express");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
// Endpoint GET
const usersGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  // Query to filter for status = true
  const query = { status: true };

  // const { limit = 5, from = 0 } = req.query; // http://localhost:8080/api/users?from=10&limit=2 => return object 11 - 12

  // Getting filtered Users
  // const users = await UserModel.find(query).skip(from).limit(Number(limit));

  // const totalUsersRegistered = await UserModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to users
  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),

    UserModel.find(query)
  ]);
  res.json({
    total,
    users,
  });
};

const getUserByUid = async (req = request, res = response) => {
  const { uid } = req.params;

  try {
    // Find the tenant by email
    const user = await UserModel.findById(uid);

    res.json({
      msg: "User found",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error finding tenant by email",
      error: error.message,
    });
  }
};

// Endpoint PUT
const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email, password, role, google } = req.body;

  try {
    // Find the user by ID and update the fields
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, password, role, google },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating user",
      error: error.message,
    });
  }
};

// Endpoint POST
const usersPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { name, email, password, role } = req.body;
  const user = new UserModel({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
    user,
  });
};

// Endpoint DELETE
const usersDelete = async (req, res) => {
  const { id } = req.params;

  const uid = req.uid;
  
  // This is to remove an user
  // const userToBeDeleted = await UserModel.findByIdAndDelete(id);

  // This is to change user status to false
  const userToBeDeletedByStatusToFalse = await UserModel.findByIdAndUpdate(id, {
    status: false,
  });
  const user = req.user;

  res.json({ userToBeDeletedByStatusToFalse, user });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  getUserByUid
};
