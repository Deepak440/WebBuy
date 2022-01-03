import React, { useState } from "react";
import { Form, Button, FormControl, FormLabel, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from '../actions/cartAction';
import CheckoutSteps from "../components/checkoutSteps";


const ShippingScreen = ({history}) => {

    // Fill address with inital state if exist
    const cart = useSelector(state => state.cart);

    const {shippingAddress}  = cart;
    
    const [address , SetAddress] = useState(shippingAddress.address);
    const [city , SetCity] = useState(shippingAddress.city);
    const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode);
    const [country , SetCountry] = useState(shippingAddress.country);
     
    const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
     // call dispatch for save shipping address
     dispatch(saveShippingAddress({address , city , postalCode , country}));

     //  Move to the next page => payment 
     history.push('/payment');

    }


    return (
        <FormContainer>

          <CheckoutSteps step1 step2 />
            <h1> shipping </h1>
          <Form  onSubmit = {submitHandler}>

          <FormGroup className="mb-3" controlId='address'>
          <FormLabel> Address</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={(e) => SetAddress(e.target.value)}
          ></FormControl>
        </FormGroup >
        
        <FormGroup className="mb-3" controlId='city'>
          <FormLabel> City</FormLabel>
          <FormControl
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={(e) => SetCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        
        <FormGroup className="mb-3" controlId='postalCode'>
          <FormLabel> Postal Code </FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Address'
            required
            value={postalCode}
            onChange={(e) => SetPostalCode(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup className="mb-3" controlId='country'>
          <FormLabel> Country  </FormLabel>
          <FormControl
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => SetCountry(e.target.value)}
          ></FormControl>
        </FormGroup>

         <Button  type = 'submit' variant = 'primary' > Continue </Button>
          </Form>
        
        </FormContainer>
    )
}

export default ShippingScreen
