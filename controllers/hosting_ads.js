const { response, request } = require("express");
const { db } = require("../firebase/config/firebase_admin");

// Get all hosting ads with pagination
const hostingAdGet = async (req = request, res = response) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const adsRef = db.ref('hostingAds');

    // Get all ads
    const snapshot = await adsRef.once('value');
    const data = snapshot.val();

    // Paginate if needed
    const allAds = Object.values(data || {});
    const paginatedAds = allAds.slice(Number(from), Number(from) + Number(limit));

    res.json({
      total: allAds.length,
      hostingAds: paginatedAds,
    });
  } catch (error) {
    console.error("Error fetching hosting ads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a hosting ad by ID
const hostingAdPut = async (req, res = response) => {
  const { id } = req.params;
  const {
    title,
    description,
    images,
    petTypes,
    selectedDays,
    price,
    additionalServices,
    address,
  } = req.body;

  try {
    const adRef = db.ref(`hostingAds/${id}`);
    await adRef.update({
      title,
      description,
      images,
      petTypes,
      selectedDays,
      price,
      additionalServices,
      address,
    });

    res.json({ message: 'Hosting ad updated successfully' });
  } catch (error) {
    console.error("Error updating hosting ad:", error);
    res.status(500).json({ error: "Error updating hosting ad" });
  }
};

// Create a new hosting ad
const hostingAdPost = async (req, res) => {
  const {
    title,
    description,
    images,
    petTypes,
    selectedDays,
    price,
    additionalServices,
    address,
  } = req.body;

  try {
    const adRef = db.ref('hostingAds');
    const newAdRef = adRef.push(); // Generate a unique key
    await newAdRef.set({
      title,
      description,
      images,
      petTypes,
      selectedDays,
      price,
      additionalServices,
      address,
    });

    res.status(201).json({
      ok: true,
      id: newAdRef.key,
    });
  } catch (error) {
    console.error("Error creating hosting ad:", error);
    res.status(500).json({ error: "Error creating hosting ad" });
  }
};

// Delete a hosting ad by ID
const hostingAdDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const adRef = db.ref(`hostingAds/${id}`);
    await adRef.remove();

    res.json({ message: 'Hosting ad deleted successfully' });
  } catch (error) {
    console.error("Error deleting hosting ad:", error);
    res.status(500).json({ error: "Error deleting hosting ad" });
  }
};

module.exports = {
  hostingAdGet,
  hostingAdPost,
  hostingAdPut,
  hostingAdDelete,
};
