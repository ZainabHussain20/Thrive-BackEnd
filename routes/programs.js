const express = require("express")
const router = express.Router()
const programsCtrl = require("../controllers/programs")

router.get("/reviews", programsCtrl.showReview)
router.post("/addProgram", programsCtrl.addProgram)
router.get("/", programsCtrl.getPrograms)
router.get("/:programId", programsCtrl.getProgramsDetail)
router.delete("/delete/:programId", programsCtrl.deleteProgram)
router.put("/update/:programId", programsCtrl.updateProgram)
router.post("/reviews/:userId", programsCtrl.addReview)
router.delete("/:programId/reviews/:reviewId", programsCtrl.deleteReview)

module.exports = router
