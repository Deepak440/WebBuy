import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormFile,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { listProductDetails, updateProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, SetName] = useState("");
  const [price, SetPrice] = useState(0);
  const [image, SetImage] = useState("");
  const [brand, SetBrand] = useState("");
  const [category, SetCategory] = useState("");
  const [countInStock, SetcountInStock] = useState(0);
  const [description, SetDescription] = useState("");
  const [uploading, SetUplaoding] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        SetName(product.name);
        SetPrice(product.price);
        SetBrand(product.brand);
        SetImage(product.image);
        SetCategory(product.category);
        SetDescription(product.description);
        SetcountInStock(product.countInStock);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  // Image Upload handler

  const uploadFileHandler = async (e) => {
    // Files is the array => as we have the abily to upload multiple array => but we need only one
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    SetUplaoding(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config);
      

      // data => path of the image
      SetImage(data);
      SetUplaoding(false);
    } catch (error) {
      console.error(error);
      SetUplaoding(false);
    }
  };

  // Update Product
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        countInStock,
        brand,
        category,
        image,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'> {errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'></Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup className='mb-3' controlId='name'>
              <FormLabel> Name</FormLabel>
              <FormControl
                type='name'
                placeholder='Enter Name '
                value={name}
                onChange={(e) => SetName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup className='mb-3' controlId='price'>
              <FormLabel> Price</FormLabel>
              <FormControl
                type='number'
                placeholder='Enter the Price'
                value={price}
                onChange={(e) => SetPrice(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup className='mb-3' controlId='image'>
              <FormLabel> Image </FormLabel>
              <FormControl
                type='text'
                placeholder='Enter the image URL'
                value={image}
                onChange={(e) => SetImage(e.target.value)}
              ></FormControl>

              <FormFile
                id='image-file'
                lable='Choose File'
                custom
                onChange={uploadFileHandler}
              ></FormFile>
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup className='mb-3' controlId='brand'>
              <FormLabel> Brand </FormLabel>
              <FormControl
                type='text'
                placeholder='Enter the Brand name'
                value={brand}
                onChange={(e) => SetBrand(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup className='mb-3' controlId='countInStock'>
              <FormLabel> Count In Stock</FormLabel>
              <FormControl
                type='number'
                placeholder='Enter the Count In Stock'
                value={countInStock}
                onChange={(e) => SetcountInStock(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup className='mb-3' controlId='category'>
              <FormLabel> Category </FormLabel>
              <FormControl
                type='text'
                placeholder='Enter the Category'
                value={category}
                onChange={(e) => SetCategory(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup className='mb-3' controlId='description'>
              <FormLabel> Description </FormLabel>
              <FormControl
                type='text'
                placeholder='Enter the Description'
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
              ></FormControl>
            </FormGroup>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
