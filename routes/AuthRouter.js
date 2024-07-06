const router = require("express").Router()
const controller = require("../controllers/AuthController")
const middleware = require("../middleware")

router.post("/login", controller.Login)
router.post("/register", controller, Register)
router.put("/reset-password", controller, UpdatePassword)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
