const express = require("express")
const router = express.Router()
const profileCtrl = require("../controllers/profiles")

router.get("/:userId", profileCtrl.profileDetail)
router.put("/:userId/edit", profileCtrl.editProfile)

module.exports = router
