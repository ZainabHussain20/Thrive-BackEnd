const express = require("express")
const logger = require("morgan")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3001
require("./config/database")

// const usersRouter = require("./routes/AuthRouter")
const authroutes = require("./routes/AuthRouter")

// const path = require("path")
// const { register, login } = require("./controllers/User")
// const userRoutes = require("./routes/User")

const programsRouter = require("./routes/programs")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/programs", programsRouter)
app.use("/register", authroutes)
app.use("/login", authroutes)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
