const express = require('express');
const router = express.Router();
const {createProduct, getProductsBySlug} = require('../controller/product');
const { requireSignIn, adminMiddleWare } = require('../common-middleware');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage  = multer.diskStorage ({ 
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname) , 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalName)
    }
})

const upload = multer({storage : storage})

router.post('/product/create' , requireSignIn , adminMiddleWare , upload.array('productPictures') , createProduct);
router.get('/products/:slug', getProductsBySlug);
//router.get('/category/getCategory' , getCategory);
module.exports = router;