const express = require('express')
const router = express.Router()
const registrationCtrl = require('../controllers/registration')
const middleware = require('../middleware')

router.get(
  '/allRegistration',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.getAllRegistration
)
router.get(
  '/:registrationId/show',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.getOneRegistration
)
router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.getRegistration
)
router.post(
  '/receipt',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.confirmPayment
)
router.put(
  '/:registrationId',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.acceptRegistration
)
router.post(
  '/:userId/:programId',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.addToProgram
)
router.get(
  '/:userId/cart',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.showCart
)
router.delete(
  '/:userId/cart/:programId',
  middleware.stripToken,
  middleware.verifyToken,
  registrationCtrl.deleteFromTheCart
)

module.exports = router
