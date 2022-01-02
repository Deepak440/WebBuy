import React, { useEffect, useState } from "react";

import { Form, Button, Col, Row, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";




const ProfileScreen = ({location , history}) => {
   
 const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [message , SetMessage]  = useState(null);

 
  const dispatch = useDispatch();
  const userDetails  = useSelector(state => state.userDetails);
  const {loading , error , user } = userDetails;

  

  // Check if the user is login or not 
  const userLogin  = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;


  // Check when user info is updated by showing the message
  const userUpdateProfile  = useSelector(state => state.userProfileUpadte);
  const {success} = userUpdateProfile;

  // If the user is not loged in the redirect to the login route 
  useEffect( ()=> {

    if(!userInfo){
      history.push('/login');
    }else{
        if(!user.name){
            dispatch(getUserDetails('profile'));
        }else{
            SetName(user.name);
            SetEmail(user.email);
        }
    }

  }, [dispatch ,history ,userInfo, user ])
   
  const submitHandler = (e)=>{
    e.preventDefault();
    // Before dispatch check the password is same as the confirm  password
    
    if(password !== confirmPassword){
        SetMessage('Password do not match');
    }else{
        dispatch(updateUserProfile({id : user._id, name , email, password}))
    }

  }
  return <Row>
      <Col>
      <h2>User Profile</h2>
      {message && <Message variant = "danger"> {message}</Message> }
      {error && <Message variant = "danger"> {error}</Message> }
      {success && <Message variant = "success">Profile Updated</Message> }
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <FormGroup controlId='name'>
          <FormLabel> User Name</FormLabel>
          <FormControl
            type='name'
            placeholder='Enter Name '
            value={name}
            onChange={(e) => SetName(e.target.value)}
          ></FormControl>
        </FormGroup>
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
        
        <FormGroup controlId='confirmPassword'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type='password'
            placeholder='Confirm  Password'
            value={confirmPassword}
            onChange={(e) => SetConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button  type='submit' variant='primary'>
          Update
        </Button>
      </Form>

      </Col>
      <Col>
      <h2>
          My Orders
      </h2>
      </Col>
  </Row>
    
};

export default ProfileScreen;
