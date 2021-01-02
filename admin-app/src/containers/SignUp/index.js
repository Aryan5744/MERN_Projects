import React , {useState} from 'react'
import {Container , Form , Button , Row , Col} from 'react-bootstrap';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { useDispatch,useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';

/**
* @author
* @function SignUp 
**/
const SignUp = (props) => {   

  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const userSignUp = (e) => {

    e.preventDefault();
    
    const user = {
      firstName, lastName, email, password
    }

    dispatch(signup(user));
  }

  if(auth.authenticate){
    return <Redirect to = '/' />
  }

  if(user.loading){
    return <p>Loading...!!</p>
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style = {{marginTop : '50px'}}>
          <Col md = {{span : 6, offset : 3}}>
            <Form onSubmit = {userSignUp}>
              <Row>
                <Col md = {6}>
                  <Input
                    Label = "First Name"
                    placeholder = "First Name"
                    type = "text"
                    value = {firstName}
                    onChange = {(e) => setfirstName(e.target.value)}
                  />
                </Col>
                <Col md = {6}>
                <Input
                    Label = "Last Name"
                    placeholder = "Last Name"
                    type = "text"
                    value = {lastName}
                    onChange = {(e) => setlastName(e.target.value)}
                  />
                </Col>
              </Row>
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
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default SignUp