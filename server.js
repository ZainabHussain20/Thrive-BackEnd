const express = require("express")
const logger = require("morgan")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3001
require("./config/database")

const usersRouter = require("./routes/AuthRouter")
// const authRouter = require("./routes/AuthRouter")
const programsRouter = require("./routes/programs")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/programs", programsRouter)
app.use("/auth", usersRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
