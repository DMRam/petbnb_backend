const { Schema, model } = require("mongoose");

// Sub-schema for HostAddress
const HostAddressSchema = new Schema({
  userId: {
    type: String,
    required: [true, "The address must be associated with a user ID"],
  },
  address: {
    type: String,
    required: [true, "The street address is required"],
  },
  city: {
    type: String,
    required: [true, "The city is required"],
  },
  state: {
    type: String,
    required: [true, "The state or province is required"],
  },
  zipCode: {
    type: String,
    required: [true, "The postal or zip code is required"],
  },
});

// Sub-schema for ImageAsset
const ImageAssetSchema = new Schema({
  uri: {
    type: String,
    required: [true, "Image URI is required"],
  },
});

// Main schema for HostingAd
const HostingAdSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  description: {
    type: String,
    required: [true, "The description is required"],
  },
  images: {
    type: [ImageAssetSchema],  // Array of ImageAsset
    required: [true, "At least one image is required"],
  },
  petTypes: {
    type: [String],  // Array of strings representing pet types
    required: [true, "At least one pet type is required"],
  },
  selectedDays: {
    type: Schema.Types.Mixed, // Assuming any data type
    required: [true, "Selected days are required"],
  },
  price: {
    type: String,
    required: [true, "The price is required"],
  },
  additionalServices: {
    type: [String], // Array of additional services
    default: [],
  },
  address: {
    type: HostAddressSchema,  // Embedding the HostAddress schema
    required: [true, "The address is required"],
  },
});

// Optionally, you can add methods to the schema, e.g., toJSON:
HostingAdSchema.methods.toJSON = function () {
  const { __v, _id, ...hostingAd } = this.toObject();
  hostingAd.id = _id;
  return hostingAd;
};

module.exports = model("HostingAd", HostingAdSchema);
