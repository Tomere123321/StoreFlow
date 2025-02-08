const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  cartItems: [
    {
      quantity: { type: Number, required: true, default: 1 },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }
    }
  ]
});

const CustomersModel = mongoose.model("customer", customersSchema);

module.exports = CustomersModel;
