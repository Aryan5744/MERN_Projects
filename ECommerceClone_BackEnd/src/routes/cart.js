const express = require('express');
const { addItemToCart } = require('../controller/cart');
const { requireSignIn, userMiddleWare } = require('../common-middleware');
const router = express.Router();

router.post('/user/cart/addtocart' , requireSignIn , userMiddleWare , addItemToCart);
router.post('/user/getCartItems', requireSignIn, userMiddleWare, getCartItems);
module.exports = router;