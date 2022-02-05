import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/loader";
import { getUserDetails, updateUser } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [isAdmin, SetIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    succes: succesUpdate,
  } = userUpdate;

  useEffect(() => {
    if (succesUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        SetName(user.name);
        SetEmail(user.email);
        SetIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, succesUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'></Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup className='mb-3' controlId='name'>
              <FormLabel> User Name</FormLabel>
              <FormControl
                type='name'
                placeholder='Enter Name '
                value={name}
                onChange={(e) => SetName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup className='mb-3' controlId='email'>
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type='email'
                placeholder='Enter the email Address'
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup className='mb-3' controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => SetIsAdmin(e.target.checked)}
              ></Form.Check>
            </FormGroup>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
