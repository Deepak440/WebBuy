import React, { useState } from "react";
import { Form, Button,Col,  FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/checkoutSteps";


const PaymentScreen = ({history}) => {


    const cart = useSelector(state => state.cart);
    const {shippingAddress}  = cart;

    // Check for the shipping address
    if(!shippingAddress){
        history.push('/shipping');
    }
    
    // Default method of payment
    const [paymentMethod , SetPaymentMethod] = useState("PayPal");

     
    const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
     // call dispatch for save shipping address
     dispatch(savePaymentMethod(paymentMethod));

     //  Move to the next page => placeorder
     history.push('/placeorder');

    }


    return (
        <FormContainer>

          <CheckoutSteps step1 step2 step3 />
            <h1> Payment Method</h1>
           <Form  onSubmit = {submitHandler}>
             
             <FormGroup> 
                <Form.Label as = 'legend'> Select Method</Form.Label>
                <Col>
                 <Form.Check type ='radio' label= 'PayPal or Credit Card' id ='Paypal' name ='paymentMethod' value = 'PayPal' checked  onChange={(e)=> SetPaymentMethod(e.target.value)}>
{/* type = radio => cannot check more than one option */}
                  </Form.Check>
                </Col>
             </FormGroup>
                     

         <Button  type = 'submit' variant = 'primary' > Continue </Button>
          </Form>
        
        </FormContainer>
    )
}

export default PaymentScreen;
