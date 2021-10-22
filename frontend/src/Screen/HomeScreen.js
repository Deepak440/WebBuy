import React, {useState , useEffect} from 'react';
import {Row , Col} from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
   const [Products ,setProducts]  = useState([]);

   useEffect( () => {
      const fetchProducts  = async() => {
        const {data} = await axios.get('/api/products');
        setProducts(data);
       
      }
      fetchProducts();  
   }, []);

    return (
        <>
          <Row> 
           {Products.map( product => (
              <Col key = {product._id} sm = {12} md = {6} lg = {4} xl = {3}>
                 <Product  product = {product} />
              </Col>

           ))}    
          </Row>  
        </>
    )
}

export default HomeScreen;
