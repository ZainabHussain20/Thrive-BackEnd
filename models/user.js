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
    password: { type: String, required: true },
    gender: { type: String, required: true },
    type: String,
    passwordDigest: { type: String, required: true },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    userList: [{ type: Schema.Types.ObjectId, ref: "Program" }],
    type: String,
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
