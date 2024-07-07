const mongoose = require("mongoose")
const Schema = mongoose.Schema
const registrationSchema = new Schema(
  {
    program: { type: Schema.Types.ObjectId, ref: "Program" },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    state: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Registration", registrationSchema)
