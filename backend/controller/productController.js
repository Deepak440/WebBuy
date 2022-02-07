import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";

// @desc : Fetch all product
// @route : Get /api/product
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc : Fetch single product
// @route : Get /api/product/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not find" });
  }
});

// @desc : Delete product from database
// @route : Delete /api/products/:id
// @access Private/Adminn
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});


// @desc : Create product
// @route : Post /api/products
// @access Private/Adminn
const createProduct = asyncHandler(async (req, res) => {
  
  const product = new Product({
     name : 'Sample name',
     price : 0,
     user : req.user._id, 
     image : '/images/sample.jpg',
     category :'Sample Category',
     brand : 'Sample brand',
    countInStock : 0 ,
    numReviews : 0,
    description : 'Sample Description'

  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


// @desc : Update product
// @route : Put /api/products/:id  
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  
  const {
    name,
    price,
    description,
    countInStock,
    brand,
    category,
    image
  } = req.body;

  const product = await Product.findById(req.params.id);
  

  if(product){
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
  }else{
    res.status(404);
    throw  new Error("Product not found");
  }
});




// @desc : Create Reviews
// @route : Post /api/products/:id/reviews  
// @access Private/

const createProductReviews = asyncHandler(async (req, res) => {
  
  const {
    rating,
    comment
  } = req.body;

  
  const product = await Product.findById(req.params.id);

  if(product){
  
    // Check whether the product is already reviewd by same user

    const reviewsAlready = product.reviews.find( r => r.user.toString() === req.user._id.toString());

    if(reviewsAlready){
      res.status(404);
      throw new Error("Product is already reviewd");
    }

    const review = {
      name : req.user.name,
      rating : Number(rating),
      comment,
      user : req.user._id,

    }
    

  
    product.reviews.push(review);
    product.numReviews = product.reviews.length
    // Overall rating of the product
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length;

    await product.save();
    res.status(201).json({message : "Reviews added"});

  }else{
    res.status(404);
    throw  new Error("Product not found");
  }
});
export { getProducts, getProductById, deleteProduct , createProduct, updateProduct , createProductReviews};
