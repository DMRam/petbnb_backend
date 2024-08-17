const { response, request } = require("express");
const RentalModel = require("../models/rental");

const rentalGet = async (req = request, res = response) => {
  try {
    const query = { status: true };
    const { limit = 5, from = 0 } = req.query;

    const [total, rentals] = await Promise.all([
      RentalModel.countDocuments(query),
      RentalModel.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    res.json({ total, rentals });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const rentalPut = async (req, res = response) => {
  const { id } = req.params;
  const { systemName, dateFrom, dateTo, status } = req.body;

  try {
    const rental = await RentalModel.findByIdAndUpdate(
      id,
      { systemName, dateFrom, dateTo, status },
      { new: true }
    );

    res.json(rental);
  } catch (error) {
    console.error("Error updating rental:", error);
    res.status(500).json({ error: "Error updating rental" });
  }
};

const rentalPost = async (req, res) => {
  const {
    systemName,
    ownerId,
    address,
    propertyRole,
    dateFrom,
    dateTo,
    status,
    client,
    tenant,
  } = req.body;

  // // Check if ownerId is provided
  // if (!ownerId) {
  //   return res
  //     .status(400)
  //     .json({ error: "El contrato debe especificar un creador" });
  // }

  const rental = new RentalModel({
    systemName,
    ownerId,
    address,
    propertyRole,
    dateFrom,
    dateTo,
    status,
    client,
    tenant,
  });

  
  try {
    await rental.save();
    res.status(201).json({
      ok: true,
      rental,
    });
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ error: "Error creating rental" });
  }
};

const rentalDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const rental = await RentalModel.findByIdAndUpdate(id, { status: false });
    res.json({ rental });
  } catch (error) {
    console.error("Error deleting rental:", error);
    res.status(500).json({ error: "Error deleting rental" });
  }
};

module.exports = {
  rentalGet,
  rentalPost,
  rentalPut,
  rentalDelete,
};
