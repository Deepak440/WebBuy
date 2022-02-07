import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setkeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //trim white space
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className = 'd-flex'>
      <FormControl
        type='text'
        name='q'
        onChange={(e) => setkeyword(e.target.value)}
        placeholder='Search Products... '
        className='mr-sm-2 ml-sm-5'
      ></FormControl>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default  SearchBox;
