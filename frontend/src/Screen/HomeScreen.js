import React from 'react';
import {Row , Col} from 'react-bootstrap';
import Products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <>
          <h3> latest Products </h3>
          <Row> 
           {Products.map( product => (
              <Col sm = {12} md = {6} lg = {4} xl = {3}>
                 <Product  product = {product} />
              </Col>

           ))}    
          </Row>  
        </>
    )
}

export default HomeScreen;
