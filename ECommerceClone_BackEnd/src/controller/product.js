const { default: slugify } = require('slugify');
const Product = require('../models/product');
const Category = require('../models/category');

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
        if(error) return res.status(400).json({error : console.error()});
        if(product) {
            res.status(201).json({product});
        }
    });
};

exports.getProductsBySlug = (req, res) => {
    const {slug} = req.params;
    Category.findOne({slug : slug})
    .select('_id')
    .exec((error, category) => {
        if(error){
            return res.status(400).json({error});
        }
        if(category){
            Product.find({category : category._id})
            .exec((error, products) => {

                if(error){
                    return res.status(400).json({error});
                }

                if(products.length > 0){
                    res.status(200).json({
                        products,
                        productsByPrice : {
                            under5K : products.filter(product => product.price <= 5000),
                            under10K : products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15K : products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20K : products.filter(product => product.price > 15000 && product.price <= 20000),
                            under25K : products.filter(product => product.price > 20000 && product.price <= 25000),
                            under50K : products.filter(product => product.price > 25000 && product.price <= 50000)
                        }
                    });
    
                }
            });
        }
    });
}
exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) return res.status(200).json({ product });
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };