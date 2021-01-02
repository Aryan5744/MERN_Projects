const express = require('express');
const { signup, signin } = require('../../controller/admin/auth');
const user = require('../../models/user');
const {validateSignUpRequest , validateSignInRequest , isRequestValidated} = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signup', validateSignUpRequest , isRequestValidated , signup);
router.post('/admin/signin', validateSignInRequest , isRequestValidated , signin);

module.exports = router;