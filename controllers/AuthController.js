const User = require("../models/user")
const Cart = require("../models/cart")
const middleware = require("../middleware/index")

const Register = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      birthDate,
      cpr,
      email,
      password,
      gender,
      phoneNumber,
      type,
    } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ userName })
    if (existingUser) {
      return res.status(400).send("The username has already been registered!")
    } else {
      const cart = await Cart.create({ program: [], totalPrice: 0 })
      const user = await User.create({
        userName,
        firstName,
        lastName,
        birthDate,
        cpr,
        email,
        gender,
        phoneNumber,
        type,
        passwordDigest,
        cart: cart._id,
      })
      res.send(user)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: user._id,
        userName: user.userName,
        type: user.type,
      }

      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "An error has occurred!" })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { userName, newPassword } = req.body

    let user = await User.findOne({ userName })

    if (!user) {
      return res.status(404).send({ status: "Error", msg: "User not found" })
    }

    let passwordDigest = await middleware.hashPassword(newPassword)
    user.passwordDigest = passwordDigest
    await user.save()
    res.send({ status: "Password Updated!" })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: "Error",
      msg: "An error has occurred updating the password!",
    })
    let payload = {
      id: user.id,
      email: user.email,
    }
    return res.send({ status: "Password Updated!", user: payload })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
}
