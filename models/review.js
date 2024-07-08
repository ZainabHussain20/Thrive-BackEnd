const mongoose = require("mongoose")
const Schema = mongoose.Schema
const reviewSchema = new Schema(
  {
    content: { type: String },
    rating: { type: String },
    // program: { type: Schema.Types.ObjectId, ref: "Program" },
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
