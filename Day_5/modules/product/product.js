const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    sale: {type: Boolean}
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Product", ProductSchema);
module.exports = CommentModel;
