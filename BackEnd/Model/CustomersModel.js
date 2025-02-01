const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
});

const CustomersModel = mongoose.model("customer", customersSchema);

module.exports = CustomersModel;
