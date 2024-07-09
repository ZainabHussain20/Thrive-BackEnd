const express = require("express")
const router = express.Router()
const registrationCtrl = require("../controllers/registration")



// // User registration routes
// router.get('/:userId', registrationCtrl.getRegistration)
// router.post('/:userId/:programId', registrationCtrl.addToProgram)

// // Admin registration management routes
// router.put('/:registrationId', registrationCtrl.acceptRegistration)

// // Cart routes
// router.get('/:userId/cart/', registrationCtrl.showCart)
// router.delete('/:userId/cart/:programId', registrationCtrl.deleteFromTheCart)

// module.exports = router

// User registration routes
router.get('/:userId', registrationCtrl.getRegistration);
router.post('/:userId/:programId', registrationCtrl.addToProgram);

// Admin registration management routes
// router.get('/pending/:userId', registrationCtrl.getPendingRegistrations);
router.put('/:registrationId', registrationCtrl.acceptRegistration);

// Cart routes
router.get('/:userId/cart', registrationCtrl.showCart);
router.delete('/:userId/cart/:programId', registrationCtrl.deleteFromTheCart);

module.exports = router
