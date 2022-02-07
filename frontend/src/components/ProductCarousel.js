import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Carousel, CarouselItem, Image} from 'react-bootstrap';
import Loader from './loader';
import Message from './Message';
import { topProducts } from '../actions/productAction';
import { useDispatch, useSelector } from "react-redux";



const ProductCarousel = () => {

    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated);
    const {loading , error , products} = productTopRated; 
    
    useEffect( () =>  {
        dispatch(topProducts());
    },[dispatch])

     
    return loading ? <Loader /> : error ? <Message variant = 'danger' >{error}</Message>: (
        <Carousel pause = 'hover'  className='bg-dark'>
             {products.map(product => (
                 <CarouselItem key = {product._id}>
                     <Link  to = {`/product/${product._id}`} >
                        <Image src = {product.image} alt = {product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}({product.price})</h2>
                        </Carousel.Caption>
                     </Link>
                 </CarouselItem>
             ))}
        </Carousel>
    )
};

export default ProductCarousel;
