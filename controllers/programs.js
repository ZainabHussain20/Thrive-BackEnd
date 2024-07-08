const Program = require("../models/program")
const Review = require("../models//review")

const addProgram = async (req, res) => {
  try {
    const {
      name,
      start,
      end,
      time,
      period,
      description,
      limit,
      gender,
      price,
      location,
      block,
      building,
      line,
    } = req.body

    const createdProgram = await Program.create({
      name,
      start,
      end,
      time,
      period,
      description,
      limit,
      gender,
      price,
      location,
      block,
      building,
      line,
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
  const programId = req.params.programId

  try {
    const review = new Review({
      content,
      rating,
      user: userId,
    })
    const createdReview = await review.save()

    const program = await Program.findById(programId)
    program.reviews.push(createdReview._id)
    await program.save()
    res.status(201).send(createdReview)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: "Internal Server Error" })
  }
}

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId
  const deleted = await Review.findByIdAndDelete(reviewId)
  res.status(201).send(deleted)
}

const showReview = async (req, res) => {
  const review = await Review.find({})
  res.status(200).json(review)
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
}
