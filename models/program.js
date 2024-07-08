const mongoose = require("mongoose")
const Schema = mongoose.Schema
const programSchema = new Schema(
  {
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    time: [
      {
        type: String,
        enum: ["08:00 - 16:00", "09:00 - 17:00", "10:00 - 18:00"],
      },
    ],
    period: [
      {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        required: true,
      },
    ],
    description: String,
    limit: Number,
    gender: String,
    price: Number,
    location: String,
    block: String,
    bulding: String,
    line: String,
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Program", programSchema)
