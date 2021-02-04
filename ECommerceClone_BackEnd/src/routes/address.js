const express = require('express');
const { addAddress, getAddress } = require('../controller/address');
const { requireSignIn, userMiddleWare } = require('../common-middleware');
const router = express.Router();

router.post('/user/address/create', requireSignIn, userMiddleWare, addAddress);
router.post('/user/getaddress', requireSignIn, userMiddleWare, getAddress);

module.exports = router;