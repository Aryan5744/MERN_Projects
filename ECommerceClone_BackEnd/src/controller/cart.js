const Cart = require('../models/cart');

exports.addItemToCart = (req , res) => {
    Cart.findOne({user : req.user._id})
    .exec((error , cart) => {
        if(error) return res.status(400).json({error});
        if(cart){
            const _product = req.body.cartItems.product;
            const isItemExists = cart.cartItems.find(c => c.product == _product);
            let condition, action;

            if(isItemExists){
                condition = { "user" : req.user._id , "cartItems.product" : _product };
                action = { "$set" : { "cartItems.$" : { ...req.body.cartItems , quantity : isItemExists.quantity + req.body.cartItems.quantity } } }; 
            }
            else{
                condition = { "user" : req.user._id }; 
                action = { "$push" : { "cartItems" : req.body.cartItems } }; 
            }
            Cart.findOneAndUpdate( condition, action ).exec((error , _cart) => {
                if(error) return res.status(400).json({error});
                if(_cart) return res.status(201).json({ cart : _cart});
            });            
        }
        else{
            const cart = new Cart({
                user : req.user._id,
                cartItems : [req.body.cartItems]
            });
            cart.save((error , cart) => {
                if(error) return res.status(400).json({error});
                if(cart)  return res.status(201).json({cart : cart});
            });
        }
    });
};

exports.getCartItems = (req, res) => {
    Cart.findOne({user : req.user._id})
    .populate('cartItems.product', '_id name price productPictures')
    .exec((error, cart) => {
        if(error) return res.status(400).json({error});
        if(cart){
            let cartItems = {};
            cart.cartItems.forEach(element => {
                cartItems[element.product._id.toString()] = {
                    _id : element.product._id.toString(),
                    name : element.product.name,
                    price : element.product.price,
                    img : element.product.productPictures[0].img,
                    qty : element.quantity
                }
            });
            res.status(200).json({cartItems});
        }
    })
}