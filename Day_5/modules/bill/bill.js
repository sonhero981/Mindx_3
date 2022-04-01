const mongoose = require("mongoose");
const BillSchema = new mongoose.Schema(
  {
    listProduct: [Object],
    userId: { type: mongoose.Types.ObjectId },
    totalCosts: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BillModel = mongoose.model("Bill", BillSchema);
module.exports = BillModel;
