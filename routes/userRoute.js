const express = require('express');
const {
    createUser, loginUser, sendOtp, updatePassword, verifyOtp,
} = require('../controllers/userCtrl');
const router = express.Router();



router.post('/register-user', createUser);
router.post('/login-user', loginUser)
router.post('/forgot-password', sendOtp)
router.post('/verify-otp/:userId', verifyOtp)
router.put('/reset-password/:userId', updatePassword)


module.exports = router;    