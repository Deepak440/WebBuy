import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productAction";
import Loader from "../components/loader";
import Message from "../components/Message";

import {PRODUCT_CREATE_REVIEWS_RESET} from '../constants/productConstant';

const ProductScreen = ({ match , history}) => {
  // set the quantity of the products, It has Component level state
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success : successProductReview, error : errorProductReview , loading : loadingProductReview  } = productReviewCreate;

  useEffect(() => {

    if(successProductReview){
      alert('Review Submitted');
      setComment('');
      setRating(0);
      dispatch({type : PRODUCT_CREATE_REVIEWS_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty =${qty}`)
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(createProductReview(match.params.id, {
      rating,
      comment,
    }));
  }

  return (
    <>
      <Link to='/'>
        {" "}
        <Button className='my-4'>Go Back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='Danger'>{error}</Message>
      ) : (
        <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.image} rounded fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {" "}
                <h3>{product.name} </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='Light'>
                <Row className='p-2'>
                  <Col> Price : </Col>
                  <Col>
                    <strong> ${product.price} </strong>
                  </Col>
                </Row>
              </ListGroup>

              <ListGroup>
                <Row className='p-2'>
                  <Col> Status : </Col>
                  <Col>
                    <strong style={{ textAlign: "center" }}>
                      {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup>

              {product.countInStock > 0 && (
                <ListGroup>
                  <Row className='p-2'>
                    <Col>Qty</Col>

                    <Col>
                      <Form.Control
                        className='form-select'
                        as='select'
                        value={qty}
                        onChange={(e) =>  setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup>
              )}

              <ListGroup>
                <ListGroup.Item>
                  <Button
                    onClick  = {addToCartHandler}
                    className='btn-block'
                    type='button'
                    dissabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md = {6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant = 'flush'>
              {product.reviews.map( review => (
                <ListGroupItem kye ={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value = {review.rating}></Rating>
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>

                </ListGroupItem>
              ))}

              <ListGroupItem>
                <h2>Wrtite a Customer Review</h2>
                {errorProductReview && <Message variant = 'danger'>{errorProductReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <FormGroup controlId='rating'>
                      <FormLabel>Rating</FormLabel>
                      <Form.Control as = 'select' value ={rating} onChange = {(e) => setRating(e.target.value)}>
                        <option value = ''> Select...</option>
                        <option value = "1" > 1 - Poor</option>
                        <option value = "2"> 2 - Fair</option>
                        <option value = "3"> 3 - Good </option>
                        <option value = "4"> 4 - Very Good</option>
                        <option value = "5"> 5 - Excellent</option>

                      </Form.Control>
                    </FormGroup>

                    <FormGroup controlId="comment">
                      <FormLabel>Comment</FormLabel>
                      <Form.Control as = 'textarea' row = '3' value = {comment}
                      onChange= {(e)=> setComment(e.target.value)}>
                      </Form.Control>
                    </FormGroup>

                    <Button type = 'submit' variant="primary">
                     Submit
                    </Button>

                  </Form>
                ) : <Message>
                  Please <Link to ='/login'> Sign in</Link>
                  to write a review
                  {' '}
                  </Message>}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
