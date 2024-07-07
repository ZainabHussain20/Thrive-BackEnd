const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    firstName: String,
    lastName: String,
    birthDate: Date,
    cpr: { type: String, required: true },
    email: String,
    passwordDigest: { type: String, required: true },
    gender: { type: String, required: true },
    type: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    userList: [{ type: Schema.Types.ObjectId, ref: "Program" }],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    userprogram: [{ type: Schema.Types.ObjectId, ref: "Program" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
