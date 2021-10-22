import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image ,ListGroup ,Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';


const ProductScreen = ({match}) => {
    const [product ,setproduct]  = useState({});

    useEffect( () => {
       const fetchProduct  = async() => {
         const {data} = await axios.get(`/api/products/${match.params.id}`);
         setproduct(data);
        
       }
       fetchProduct();  
    }, [match]);

    return (
        <>
         <Link to ="/" > <Button className = "my-4">Go Back</Button></Link>   
         <Row>
             <Col md ={6}>
             <Image src ={product.image} alt = {product.image} rounded fluid  />
             </Col>
             <Col md ={3}>
             <ListGroup variant = 'flush'>
                  <ListGroup.Item> <h3>{product.name} </h3></ListGroup.Item>
                  <ListGroup.Item>
                      <Rating  value = {product.rating} text = {`${product.numReviews} reviews`} />
                 </ListGroup.Item> 
                  <ListGroup.Item> 
                      Price : ${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      Description : {product.description}
                  </ListGroup.Item>
                  </ListGroup> 
             </Col>
             <Col md = {3}>
                <Card >
                    <ListGroup variant = 'Light'>
                       <Row  className = "p-2">
                          <Col> Price : </Col>
                         <Col><strong > ${product.price} </strong> 

                        </Col>
                      </Row>
                    </ListGroup>

                    <ListGroup >
                       <Row  className = 'p-2'>
                          <Col> Status : </Col>
                         <Col><strong style = {{textAlign:'center'}}>{ product.countInStock > 0 ? 'In stock' : 'Out of Stock'}</strong> 

                        </Col>
                      </Row>
                    </ListGroup>

                    <ListGroup >
                        <ListGroup.Item>
                        <Button  className = 'btn-block' type = 'button' dissabled = {product.countInStock === 0 } >Add to Cart</Button>
                    </ListGroup.Item>
                    </ListGroup>

                    
                </Card>
             </Col>
         </Row>
        </>
    )
}

export default ProductScreen
