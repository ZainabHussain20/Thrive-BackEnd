const mongoose = require("mongoose")
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})
