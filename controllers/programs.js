const Program = require("../models/program")

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

module.exports = {
  addProgram,
  getPrograms,
  getProgramsDetail,
  deleteProgram,
  updateProgram,
}
