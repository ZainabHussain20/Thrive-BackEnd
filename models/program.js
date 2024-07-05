const mongoose = require("mongoose")
const Schema = mongoose.Schema
const programSchema = new Schema(
  {
    name: { type: String, required: true },
    start: Date,
    end: Date,
    time: String,
    period: String,
    description: String,
    limit: Number,
    gender: String,
    price: Number,
    location: String,
    block: String,
    bulding: String,
    line: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Program", programSchema)
