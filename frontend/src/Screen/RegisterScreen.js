import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { Register } from "../actions/userAction";
import FormContainer from "../components/FormContainer";


const RegisterScreen = ({location , history}) => {
   
 const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [message , SetMessage]  = useState(null);

 
  const dispatch = useDispatch();
  const userRegister  = useSelector(state => state.userRegister);
  const {loading , error , userInfo } = userRegister;



  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect( ()=> {

    if(userInfo){
      history.push(redirect);
    }

  }, [history ,userInfo , redirect])
   
  const submitHandler = (e)=>{
    e.preventDefault();
    // Before dispatch check the password is same as the confirm  password
    
    if(password !== confirmPassword){
        SetMessage('Password do not match');
    }else{
        dispatch(Register(name ,email, password));
    }

  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant = "danger"> {message}</Message> }
      {error && <Message variant = "danger"> {error}</Message> }
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <FormGroup  className="mb-3"controlId='name'>
          <FormLabel> User Name</FormLabel>
          <FormControl
            type='name'
            placeholder='Enter Name '
            value={name}
            onChange={(e) => SetName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3" controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter the email Address'
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup className="mb-3" controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter the  Password'
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        
        <FormGroup className="mb-3" controlId='confirmPassword'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Confirm  Password'
            value={confirmPassword}
            onChange={(e) => SetConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button  type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account ?{''}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
