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

    const user = await User.findById(userId).populate("userprogram")

    // Pushing the registration into userprogram array
    user.userprogram.push(registration._id)

    // Saving the user document to persist changes
    await user.save()

    res.status(200).json(registration)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error adding to cart")
  }
}
//localhost:3001/registration/:userId/:programId

// const addToCart = async (req, res) => {
//   try {
//     const programId = req.params.programId
//     const userId = req.params.userId
//     const registration = await Registration.create({
//       program: programId,
//       user: userId,
//       state: "pending",
//     })
//     const user = await User.findById(userId).populate("cart")
//     user.cart.program.push(programId)
//     await user.cart.save()

//     res.status(200).json(registration)
//   } catch (e) {
//     console.error(e)
//     res.status(500).send("Error adding to cart")
//   }
// } //localhost:3001/registration/:userId/:programId

const showCart = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate("cart")
    const cart = user.cart

    let totalPrice = 0
    for (const programP of cart.program) {
      const program = await Program.findById(programP)
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
} //localhost:3001/registration/:userId/:programId

const deleteFromTheCart = async (req, res) => {
  try {
    const userId = req.params.userId
    const programId = req.params.programId
    const user = await User.findById(userId).populate("cart")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const itemToRemoveIndex = user.cart.program.findIndex(
      (item) => item._id.toString() === programId
    )

    if (itemToRemoveIndex !== -1) {
      user.cart.program.splice(itemToRemoveIndex, 1)
      await user.cart.save()
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error)
    res.status(500).json({ message: "Error deleting item from cart" })
  }
} //localhost:3001/registration/:userId/cart/:programId

const getRegistration = async (req, res) => {
  const userId = req.params.userId
  try {
    const registrations = await Registration.find({ user: userId })
    res.status(200).json(registrations)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving registrations")
  }
} //localhost:3001/registrations/:userId

// const getPendingRegistrations = async (req, res) => {
//   try {
//     const pendingRegistrations = await Registration.find({ state: 'pending' }).populate('program user');
//     res.status(200).json(pendingRegistrations);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Error retrieving pending registrations");
//   }
// }




const acceptRegistration = async (req, res) => {
  const registrationId = req.params.registrationId

  try {
    const registration = await Registration.findById(registrationId)
    registration.state = req.body.state
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
      console.log({ cart })
    }
    await registration.save()
    res.json({ message: "Registration state updated successfully" })
  } catch (error) {
    console.error("Error updating", error)
  }
} //localhost:3001/registrations/:registrationId

module.exports = {
  showCart,
  deleteFromTheCart,
  getRegistration,
  acceptRegistration,
  addToProgram,
}
