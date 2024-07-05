const express = require("express")
const router = express.Router()
const programsCtrl = require("../controllers/programs")

router.post("/addProgram", programsCtrl.addProgram)
router.get("/", programsCtrl.getPrograms)
router.get("/:programId", programsCtrl.getProgramsDetail)
router.delete("/delete/:programId", programsCtrl.deleteProgram)

module.exports = router
