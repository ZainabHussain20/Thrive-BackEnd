const mongoose = require("mongoose")
const Schema = mongoose.Schema
const reviewSchema = new Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    content: { type: String, required: true },
    rating: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Review", reviewSchema)
