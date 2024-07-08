const express = require("express")
const router = express.Router()
const programsCtrl = require("../controllers/programs")
const middleware = require("../middleware")

router.post("/addProgram", programsCtrl.addProgram)
router.get("/", programsCtrl.getPrograms)
router.get("/:programId", programsCtrl.getProgramsDetail)
router.delete("/delete/:programId", programsCtrl.deleteProgram)
router.put("/update/:programId", programsCtrl.updateProgram)

module.exports = router
