const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema(
  {
    program: [{ type: Schema.Types.ObjectId, ref: "Program" }],
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Cart", cartSchema)
