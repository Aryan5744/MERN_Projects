const express = require('express');
const router = express.Router();
const category = require('../models/category');
const { addCategory, getCategory, updateCategories } = require('../controller/category');
const { requireSignIn, adminMiddleWare } = require('../common-middleware');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage  = multer.diskStorage ({ 
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname) , 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalName)
    }
})
const upload = multer({storage : storage})

router.post('/category/create' , requireSignIn , adminMiddleWare ,upload.single('categoryImage'), addCategory);
router.get('/category/getCategory' , getCategory);
router.post('/category/update', upload.array('categoryImage'), updateCategories);
module.exports = router;