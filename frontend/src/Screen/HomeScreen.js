import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productAction";
import Product from "../components/Product";
import Loader from "../components/loader";
import Message from "../components/Message";

const HomeScreen = ({match}) => {

   const keyword = match.params.keyword;  

  // Dispatch the action
  const dispatch = useDispatch();
  const productlist =  useSelector(state => state.productList);
  const {loading , error, products } = productlist;


  useEffect(() => { 
    dispatch(listProducts(keyword));
  }, [dispatch , keyword]);

  return (
    <>
      {loading ? (
      <Loader />
      ) : error ? (
        <Message variant = 'danger'> {error} </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
       )} 
    </>
  );
};

export default HomeScreen;
