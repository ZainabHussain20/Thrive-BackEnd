const express = require("express")
const router = express.Router()
const programsCtrl = require("../controllers/programs")

router.post("/addProgram", programsCtrl.addProgram)
router.get("/", programsCtrl.getPrograms)
router.get("/:programId", programsCtrl.getProgramsDetail)
router.delete("/delete/:programId", programsCtrl.deleteProgram)
router.put("/update/:programId", programsCtrl.updateProgram)

router.get("/:programId/reviews", programsCtrl.review)

router.post(
  "/:programId/reviews/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.addReview
)

router.delete(
  "/:programId/reviews/:reviewId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.deleteReview
)

module.exports = router
