const { Schema, model } = require("mongoose");

const TenantSchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"],
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
});
TenantSchema.methods.toJSON = function () {
  const { __v, _id, ...tenant } = this.toObject();
  tenant.uid = _id;
  return tenant;
};

module.exports = model("Tenant", TenantSchema);
