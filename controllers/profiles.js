const User = require("../models/user")

const profileDetail = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    res.status(200).json(user)
  } catch (e) {
    console.error(e)
  }
}

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId
    const updates = req.body

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    })
    res.status(200).json(user)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  profileDetail,
  editProfile,
}
