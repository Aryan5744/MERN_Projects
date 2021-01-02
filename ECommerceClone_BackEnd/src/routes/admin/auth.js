const express = require('express');
const { signup, signin, signout } = require('../../controller/admin/auth');
const user = require('../../models/user');
const { requireSignIn } = require('../../common-middleware');
const {validateSignUpRequest , validateSignInRequest , isRequestValidated} = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signup', validateSignUpRequest , isRequestValidated , signup);
router.post('/admin/signin', validateSignInRequest , isRequestValidated , signin);
router.post('/admin/signout', requireSignIn, signout);

module.exports = router;