const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/login', authCtrl.loginUser);
// router.post('/signup', authCtrl.signupUser);
router.post('/verify', authCtrl.validateToken);

module.exports = router;
