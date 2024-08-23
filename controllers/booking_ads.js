const { response, request } = require("express");
const { db } = require("../firebase/config/firebase_admin");

// BOOKING CONTROLLER
// Get all bookings with pagination
const bookingGet = async (req = request, res = response) => {
  try {
    const { limit = 50, from = 0 } = req.query;
    const bookingsRef = db.ref("bookings");

    // Get all bookings
    const snapshot = await bookingsRef.once("value");
    const data = snapshot.val();

    // Paginate if needed
    const allBookings = Object.values(data || {});
    const paginatedBookings = allBookings.slice(
      Number(from),
      Number(from) + Number(limit)
    );

    res.json({
      total: allBookings.length,
      bookings: paginatedBookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a booking by ID
const bookingPut = async (req, res = response) => {
  const { id } = req.params;
  const { petInfo, dates, comments, hostDetails, paymentData } = req.body;

  try {
    const bookingRef = db.ref(`bookings/${id}`);
    await bookingRef.update({
      petInfo,
      dates,
      comments,
      hostDetails,
      paymentData,
    });

    res.json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Error updating booking" });
  }
};

// Create a new booking
const bookingPost = async (req, res) => {
  const { petInfo, dates, comments, hostDetails, paymentData } = req.body;

  try {
    const bookingsRef = db.ref("bookings");
    const newBookingRef = bookingsRef.push(); // Generate a unique key

    await newBookingRef.set({
      petInfo,
      dates,
      comments,
      hostDetails,
      paymentData,
    });

    res.status(201).json({
      ok: true,
      id: newBookingRef.key,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: error.message || "Error creating booking" });
  }
};

// Delete a booking by ID
const bookingDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const bookingRef = db.ref(`bookings/${id}`);
    await bookingRef.remove();

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Error deleting booking" });
  }
};

module.exports = {
  bookingGet,
  bookingPost,
  bookingPut,
  bookingDelete,
};
