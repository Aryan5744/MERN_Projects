const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();
const {validateSignUpRequest , validateSignInRequest , isRequestValidated} = require('../validators/auth');

router.post('/signup', validateSignUpRequest , isRequestValidated , signup);
router.post('/signin', validateSignInRequest , isRequestValidated , signin);

module.exports = router;