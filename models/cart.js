const mongoose = require("mongoose")
const Schema = mongoose.Schema
const cartSchema = new Schema(
  {
    program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("cart", cartSchema)
