const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema({
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  Date: { type: Date,
    required: true, 
    default: Date.now },
});

const PurchasesModel = mongoose.model("purchase", purchasesSchema);

module.exports = PurchasesModel;
