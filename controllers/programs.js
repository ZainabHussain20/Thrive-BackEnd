const Program = require("../models/program")
const Review = require("../models/review")
const User = require("../models/user")

const addProgram = async (req, res) => {
  try {
    const {
      name,
      start,
      end,
      time,
      period,
      description,
      gender,
      price,
      location,
      block,
      building,
      img,
    } = req.body

    const createdProgram = await Program.create({
      name,
      start,
      end,
      time,
      period,
      description,
      gender,
      price,
      location,
      block,
      building,
      img,
    })

    await createdProgram.save()
    res.status(200).send(createdProgram)
  } catch (e) {
    console.error(e)
  }
} // localhost:3001/programs/addProgram

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({})
    res.status(200).json(programs)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving programs")
  }
} //localhost:3001/programs/

const getProgramsDetail = async (req, res) => {
  try {
    const programId = req.params.programId
    const programs = await Program.findById(programId)
    res.status(200).json(programs)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving programs")
  }
} //localhost:3001/programs/programId
const deleteProgram = async (req, res) => {
  try {
    const programId = req.params.programId
    const deleteProgram = await Program.findByIdAndDelete(programId)
    res.status(200).json(deleteProgram)
  } catch (e) {
    console.error(e)
    res.status(500).send("Error retrieving programs")
  }
} //localhost:3001/programs/delete/programId

const updateProgram = async (req, res) => {
  try {
    const programId = req.params.programId
    const program = await Program.findByIdAndUpdate(programId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!program) {
      return res.status(404).send({ error: "Program not found" })
    }
    res.status(200).send(program)
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: "Internal Server Error" })
  }
}

const addReview = async (req, res) => {
  const { content, rating } = req.body
  const userId = req.params.userId

  try {
    const review = new Review({
      content,
      rating,
      user: userId,
    })
    const createdReview = await review.save()
    res.status(201).send(createdReview)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: "Internal Server Error" })
  }
} // localhost:3001/programs/programId/reviews/userId/

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId
  const deleted = await Review.findByIdAndDelete(reviewId)
  res.status(201).send(deleted)
} // localhost:3001/programs/programId/reviews/reviewId/

const showReview = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "userName")
      .populate("program", "name")
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const userprogram = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId).populate("userprogram")
    const program = user.userprogram
    res.status(200).json(program)
  } catch (err) {
    console.error("Error fetching user program:", err)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  addProgram,
  getPrograms,
  getProgramsDetail,
  deleteProgram,
  updateProgram,
  addReview,
  deleteReview,
  showReview,
  userprogram,
  showReview,
}
