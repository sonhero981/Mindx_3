const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [String],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
