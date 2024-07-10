const express = require("express")
const router = express.Router()
const programsCtrl = require("../controllers/programs")
const middleware = require("../middleware")

router.get("/reviews", programsCtrl.showReview)
router.post(
  "/addProgram",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.addProgram
)
router.get("/", programsCtrl.getPrograms)
router.get("/:programId", programsCtrl.getProgramsDetail)
router.delete(
  "/delete/:programId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.deleteProgram
)
router.put(
  "/update/:programId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.updateProgram
)
router.post(
  "/reviews/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.addReview
)
router.get("/:userId/userprograms", programsCtrl.userprogram)

router.delete(
  "/:programId/reviews/:reviewId",
  middleware.stripToken,
  middleware.verifyToken,
  programsCtrl.deleteReview
)

module.exports = router
