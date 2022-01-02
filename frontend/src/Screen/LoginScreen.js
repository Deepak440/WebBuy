import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";


const LoginScreen = ({location , history}) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
 
  const dispatch = useDispatch();
  const userLogin  = useSelector(state => state.userLogin);
  const {loading , error , userInfo } = userLogin;



  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect( ()=> {

    if(userInfo){
      history.push(redirect);
    }

  }, [history ,userInfo , redirect])
   
  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(login(email , password));
    // DIspatch

  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant = "danger"> {error}</Message> }
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type='email'
            placeholder='Enter the email Address'
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Enter the  Password'
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button  type='submit' variant='primary'>
          Sign In{" "}
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer ?{''}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
