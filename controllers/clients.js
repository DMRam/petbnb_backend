const { response, request } = require("express");
const ClientModel = require("../models/client");
const { fieldValidate } = require("../middleware");
const { check } = require("express-validator");
const { Router } = require("express");
const router = Router();

// Endpoint GET
const clientsGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  // Query to filter for status = true
  const query = { status: true };

  // const { limit = 20, from = 0 } = req.query; // http://localhost:8080/api/clients?from=10&limit=2 => return object 11 - 12

  // Getting filtered clients
  // const clients = await ClientModel.find(query).skip(from).limit(Number(limit));

  // const totalclientsRegistered = await ClientModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to clients
  const [total, clients] = await Promise.all([
    ClientModel.countDocuments(query),

    ClientModel.find(query),
  ]);
  res.json({
    total,
    clients,
  });
};

const getClientByEmail = async (req = request, res = response) => {
  const { email } = req.params;

  try {
    // Find the tenant by email
    const client = await ClientModel.findOne({ email });

    if (!client) {
      router.post(
        "/",
        [
          check("name", "El nombre ingresado no es válido").not().isEmpty(),
          // check("email").custom(existEmail),
          fieldValidate,
        ],
        clientsPost
      );
      return res.json({
        msg: "Client not found - A new Record has been created",
      });
    }

    res.json({
      msg: "Client found",
      client,
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
const clientsPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Find the client by ID and update the fields
    const client = await ClientModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating client",
      error: error.message,
    });
  }
};

const clientsPutEmail = async (req, res = response) => {
  const { email } = req.params;
  const { name, property } = req.body;

  try {
    // Find the client by ID and update the fields
    const client = await ClientModel.findOneAndUpdate(
      email,
      { name, property },
      { new: true }
    );

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating client",
      error: error.message,
    });
  }
};

// Endpoint POST
const clientsPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { name, email, property, brokerIdAssociated } = req.body;
  const client = new ClientModel({ name, email, property, brokerIdAssociated });

  await client.save();

  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
    client,
  });
};

// Endpoint DELETE
const clientsDelete = async (req, res) => {
  const { email } = req.params;

  try {
    console.log("Email to delete:", email);

    // This is to change client status to false
    const clientToBeDeletedByStatusToFalse = await ClientModel.findOneAndUpdate(
      { email: email },
      { status: false },
      { new: true } // Optional: to return the updated document
    );

    if (!clientToBeDeletedByStatusToFalse) {
      console.log("Client not found.");
      return res.status(404).json({ message: "Client not found" });
    }

    console.log(
      "Client updated successfully:",
      clientToBeDeletedByStatusToFalse
    );
    res.json({ clientToBeDeletedByStatusToFalse });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  clientsGet,
  clientsPost,
  clientsPut,
  clientsDelete,
  getClientByEmail,
  clientsPutEmail
};
