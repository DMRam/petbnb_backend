const { Schema, model } = require("mongoose");
const Tenant = require("../models/tenant"); // Import Tenant model
const Client = require("../models/client"); // Import Client model

const RentalSchema = new Schema({
  systemName: {
    type: String,
    required: [
      true,
      "El Id del sistema debe ser los primero 3 caracteres de  UID+ArrId-Random",
    ],
  },
  ownerId: {
    type: String,
    required: [true, "El contrato debe especificar un creador "],
  },
  address: {
    type: String,
    required: [true, "El contrato debe especificar una dirección "],
  },
  propertyRole: {
    type: String,
    required: [true, "El contrato debe especificar una rol "],
  },
  dateFrom: {
    type: String,
    required: [true, "Fecha contrato desde"],
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        const contractDate = new Date(value);
        return contractDate >= currentDate;
      },
      message: "La fecha de inicio del contrato no puede ser en el pasado",
    },
  },
  dateTo: {
    type: String,
    required: [true, "Fecha contrato hasta"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: Client,
    required: [true, "El contrato requiere un Dueño de la propiedad"],
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: Tenant,
    required: [true, "El contrato requiere un Arrendatario de la propiedad"],
  },
});

RentalSchema.methods.toJSON = function () {
  const { __v, _id, ...rental } = this.toObject();
  rental.uid = _id;
  return rental;
};

module.exports = model("Rental", RentalSchema);
