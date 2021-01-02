import React, { useEffect, useState } from 'react';
import {Container , Form , Button , Row , Col} from 'react-bootstrap';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { isUserLoggedIn, login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function SignIn 
**/

const SignIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect( () => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  } , []);

  const userLogin = (e) => {

    e.preventDefault();
    
    const user = { email , password }

    dispatch(login(user));
  }

  if(auth.authenticate){
    return <Redirect to = '/' />
  }

  return (
      <Layout>
        <Container>
          <Row style = {{marginTop : '50px'}}>
            <Col md = {{span : 6, offset : 3}}>
              <Form onSubmit = {userLogin}>
                <Input
                  Label = "Email address"
                  placeholder = "Enter email"
                  type = "email"
                  value = {email}  
                  onChange = {(e) => setEmail(e.target.value)}
                  errorMessage = "We'll never share your email with anyone else."
                />
                <Input
                  Label = "Password"
                  placeholder = "Enter Password"
                  type = "password"
                  value = {password}  
                  onChange = {(e) => setPassword(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Log In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
  )
}

export default SignIn