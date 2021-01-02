const { default: slugify } = require('slugify');
const Product = require('../models/product');

exports.createProduct = (req, res) => {    
    //res.status(200).json({ file : req.files, body : req.body });
    
    const {name, price, description, category, quantity, createdBy} = req.body;
    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img : file.filename }
        });
    }

    const product = new Product({
        name : req.body.name,
        slug : slugify(name),
        price, 
        description,
        productPictures,
        category,
        quantity,
        createdBy : req.user._id
    });

    product.save((error , product) => {
        if(error) return res.status(400).json({error});
        if(product) {
            res.status(201).json({product});
        }
    });
};