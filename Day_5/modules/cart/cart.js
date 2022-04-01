const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    listProduct: [Object],
    totalCosts: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
)

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
