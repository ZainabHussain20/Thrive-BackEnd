const express = require('express')
const router = express.Router()
const registrationCtrl = require('../controllers/registration')
const middleware = require('../middleware')

router.get('/allRegistration', registrationCtrl.getAllRegistration)
router.get('/:registrationId/show', registrationCtrl.getOneRegistration)
router.get('/:userId', registrationCtrl.getRegistration)
router.post('/receipt', registrationCtrl.confirmPayment)
router.put('/:registrationId', registrationCtrl.acceptRegistration)
router.post('/:userId/:programId', registrationCtrl.addToProgram)
router.get('/:userId/cart', registrationCtrl.showCart)
router.delete('/:userId/cart/:programId', registrationCtrl.deleteFromTheCart)

module.exports = router
