const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    // Tự dộng thêm createdAt , updatedAt
    timestamps: true,
  }
)

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel
