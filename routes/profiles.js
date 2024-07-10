const express = require('express')
const router = express.Router()
const profileCtrl = require('../controllers/profiles')
const middleware = require('../middleware')

router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  profileCtrl.profileDetail
)
router.put(
  '/:userId/edit',
  middleware.stripToken,
  middleware.verifyToken,
  profileCtrl.editProfile
)

module.exports = router
