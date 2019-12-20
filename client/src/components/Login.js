import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialCredentials = {
  username: '',
  password: ''
};

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setIsFetching(true);
        props.history.push('/bubbles');
      })
      .catch(err => console.log(err.response.data.error));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for='username'>Username</Label>
          <Input
            type='text'
            name='username'
            id='username'
            value={credentials.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Log In</Button>
      </Form>
    </>
  );
};

export default Login;
