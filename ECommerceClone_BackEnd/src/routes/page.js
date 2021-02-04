const express = require('express');
const { upload, adminMiddleWare, requireSignIn } = require('../common-middleware');
const { createPage, getPage } = require('../controller/page');
const router = express.Router();

router.post('/page/create' , requireSignIn , adminMiddleWare , upload.fields([
    {name : 'banners'},
    {name : 'products'}
]) , createPage);

router.get(`/page/:category/:type`, getPage);

module.exports = router;