const { Schema, model } = require("mongoose");

// Define the embedded schema for the property details

const ClientSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    // unique: true,
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  brokerIdAssociated: {
    type: [String],
    default: [],
    validate: {
      validator: function (value) {
        return new Set(value).size === value.length; // Checks if all elements are unique
      },
      message: (props) => `${props.value} contains duplicate elements`,
    },
  },
  property: {
    number: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
});

ClientSchema.methods.toJSON = function () {
  const { __v, _id, ...client } = this.toObject();
  client.uid = _id;
  return client;
};

module.exports = model("Client", ClientSchema);
