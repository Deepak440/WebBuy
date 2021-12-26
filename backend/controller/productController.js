import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js'


// @desc : Fetch all product
// @route : Get /api/product
// @access Public

const getProducts  = asyncHandler(async(req , res) =>{
    const products = await Product.find({});
    res.json(products);
}) ;


// @desc : Fetch single product
// @route : Get /api/product/:id
// @access Public

const getProductById =  asyncHandler(async(req ,res) => {

    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message : 'Product not find'})
    }
    
});

export { getProducts , getProductById}