import express from "express";
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js'
const router  = express.Router();



// @desc : Fetch all product
// @route : Get /api/product
// @access Public
router.get('/' , asyncHandler(async(req , res) =>{
    const products = await Product.find({});
    res.json(products);
}));


// @desc : Fetch single product
// @route : Get /api/product/:id
// @access Public
router.get('/:id' , asyncHandler(async(req ,res) => {

    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message : 'Product not find'})
    }
    
}));

export default router;