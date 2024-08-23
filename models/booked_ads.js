const { Schema, model } = require("mongoose");

// Sub-schema for PetInfo
const PetInfoSchema = new Schema({
  type: {
    type: String,
    default: 'Dog',
    required: [true, "Pet type is required"],
  },
  age: {
    type: String,
    default: '3 years',
    required: [true, "Pet age is required"],
  },
  behavior: {
    type: String,
    default: 'Friendly',
    required: [true, "Pet behavior is required"],
  },
});

// Sub-schema for Dates
const DatesSchema = new Schema({
  startDate: {
    type: String,
    default: '2024-09-01',
    required: [true, "Start date is required"],
  },
  endDate: {
    type: String,
    default: '2024-09-07',
    required: [true, "End date is required"],
  },
  selectedDates: {
    type: [String], // Array of selected dates
    default: [
      '2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07'
    ],
    required: [true, "Selected dates are required"],
  },
});

// Sub-schema for HostDetails
const HostDetailsSchema = new Schema({
  name: {
    type: String,
    default: 'John Doe',
    required: [true, "Host name is required"],
  },
  location: {
    type: String,
    default: '123 Pet Lane, Pet City',
    required: [true, "Host location is required"],
  },
  rating: {
    type: Number,
    default: 4.5,
    required: [true, "Host rating is required"],
  },
  pricePerNight: {
    type: Number,
    default: 50,
    required: [true, "Price per night is required"],
  },
  images: {
    type: [String], // Array of image URLs
    default: ['image1_url', 'image2_url'],
  },
  additionalServices: {
    type: [String], // Array of additional services
    default: ['Grooming', 'Daily Walks'],
  },
});

// Main schema for Booking
const BookingSchema = new Schema({
  petInfo: {
    type: PetInfoSchema,
    required: [true, "Pet information is required"],
  },
  dates: {
    type: DatesSchema,
    required: [true, "Dates information is required"],
  },
  comments: {
    type: String,
    default: 'Please provide a quiet space for my pet.',
  },
  hostDetails: {
    type: HostDetailsSchema,
    required: [true, "Host details are required"],
  },
  paymentData: {
    type: Schema.Types.Mixed, // Assuming paymentData can be any type of data
    required: [true, "Payment data is required"],
  },
});

// Optionally, you can add methods to the schema, e.g., toJSON:
BookingSchema.methods.toJSON = function () {
  const { __v, _id, ...booking } = this.toObject();
  booking.id = _id;
  return booking;
};

module.exports = model("Booking", BookingSchema);
