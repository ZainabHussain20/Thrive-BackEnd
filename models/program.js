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
        enum: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
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
