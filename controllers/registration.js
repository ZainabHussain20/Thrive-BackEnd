const User = require("../models/user")
const Registration = require("../models/registration")
const Cart = require("../models/cart")
const Program = require("../models/program")

const addToProgram = async (req, res) => {
  try {
    const programId = req.params.programId
    const userId = req.params.userId
    const registration = await Registration.create({
      program: programId,
      user: userId,
      state: "pending",
    })

    res.status(200).json(registration)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error adding to cart")
  }
}

const showCart = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate("cart")
    const cart = user.cart

    let totalPrice = 0
    for (const programId of cart.program) {
      const program = await Program.findById(programId)
      if (program) {
        totalPrice += program.price
      }
    }
    cart.totalPrice = totalPrice
    await cart.save()
    res.status(200).json(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    res.status(500).json({ message: "Error fetching cart" })
  }
}

const deleteFromTheCart = async (req, res) => {
  try {
    const userId = req.params.userId
    const programId = req.params.programId
    const userWithCart = await User.findById(userId).populate("cart")
    if (!userWithCart) {
      return res.status(404).json({ message: "User not found" })
    }
    const cartItemIndex = userWithCart.cart.program.findIndex(
      (item) => item._id.toString() === programId
    )
    if (cartItemIndex !== -1) {
      userWithCart.cart.program.splice(cartItemIndex, 1)
      await userWithCart.cart.save()
    }
    const userWithProgram = await User.findById(userId).populate("userprogram")
    const userProgramIndex = userWithProgram.userprogram.findIndex(
      (item) => item._id.toString() === programId
    )
    if (userProgramIndex !== -1) {
      userWithProgram.userprogram.splice(userProgramIndex, 1)
      await userWithProgram.save()
    }
    res.status(200).json({
      message: "Item successfully removed from cart and user programs",
    })
  } catch (error) {
    console.error("Error deleting item from cart:", error)
    res.status(500).json({ message: "Error deleting item from cart" })
  }
}

const confirmPayment = async (req, res) => {
  try {
    const user = await User.findById(res.locals.payload.id).populate({
      path: "cart",
      populate: { path: "program" },
    })
    const cartPrograms = user.cart.program

    let totalPrice = 0
    for (const program of user.cart.program) {
      totalPrice += program.price
    }

    await Cart.findByIdAndUpdate(user.cart._id, {
      $set: { program: [], totalPrice: 0 },
    })

    res.status(200).json({
      message: "Cart cleared successfully",
      cartPrograms,
      totalPrice,
    })
  } catch (error) {
    console.error("Error clearing cart:", error)
    res.status(500).send("Error clearing cart")
  }
}

const getRegistration = async (req, res) => {
  const userId = req.params.userId
  try {
    const registrations = await Registration.find({ user: userId })
    res.status(200).json(registrations)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving registrations")
  }
}

const getOneRegistration = async (req, res) => {
  const registrationId = req.params.registrationId
  try {
    const registration = await Registration.findById(registrationId)
      .populate({ path: "user", populate: { path: "userprogram" } })
      .populate("program")
    if (!registration) {
      return res.status(404).send("Registration not found")
    }
    console.log(registration)
    res.status(200).json(registration)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving registration")
  }
}

const getAllRegistration = async (req, res) => {
  try {
    const registrations = await Registration.find({})
    res.status(200).json(registrations)
  } catch (error) {
    console.error("Error retrieving registrations:", error)
    res.status(500).send("Error retrieving registrations")
  }
}

const acceptRegistration = async (req, res) => {
  const registrationId = req.params.registrationId
  try {
    const registration = await Registration.findById(registrationId)
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" })
    }

    registration.state = req.body.state
    await registration.save()

    if (registration.state === "accept") {
      const user = await User.findById(req.body.user)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      const cart = await Cart.findByIdAndUpdate(
        user.cart,
        {
          $push: { program: req.body.program },
        },
        { new: true }
      )

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" })
      }

      user.userprogram.push(req.body.program)
      await user.save()
    }
    await Registration.findByIdAndDelete(registrationId)

    res.json({ message: "Registration state updated successfully" })
  } catch (error) {
    console.error("Error updating registration:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  showCart,
  deleteFromTheCart,
  confirmPayment,
  getRegistration,
  acceptRegistration,
  addToProgram,
  getAllRegistration,
  getOneRegistration,
}
