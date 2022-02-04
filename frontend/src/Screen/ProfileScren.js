import React, { useEffect, useState } from "react";

import {
  Form,
  Button,
  Col,
  Row,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { listMyOrder } from "../actions/orderAction";

const ProfileScreen = ({ location, history }) => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [message, SetMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // Check if the user is login or not
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Check when user info is updated by showing the message
  const userUpdateProfile = useSelector((state) => state.userProfileUpadte);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrder, error: errorOrder, orders } = orderMyList;

  // If the user is not loged in the redirect to the login route
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder());
      } else {
        SetName(user.name);
        SetEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Before dispatch check the password is same as the confirm  password

    if (password !== confirmPassword) {
      SetMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col>
        <h2>User Profile</h2>
        {message && <Message variant='danger'> {message}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'> {error}</Message>}

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
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col>
        <h2>My Orders</h2>
        {loadingOrder ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant='danger'>{errorOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered  ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to = {`/order/${order._id}`}>
                      <Button  className = 'btn-sm'variant  ='light' >Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
