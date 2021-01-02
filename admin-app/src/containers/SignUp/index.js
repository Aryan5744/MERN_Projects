import React from 'react'
import {Container , Form , Button , Row , Col} from 'react-bootstrap';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
/**
* @author
* @function SignUp 
**/
const SignUp = (props) => {
  return (
    <Layout>
      <Container>
        <Row style = {{marginTop : '50px'}}>
          <Col md = {{span : 6, offset : 3}}>
            <Form>
              <Row>
                <Col md = {6}>
                  <Input
                    Label = "First Name"
                    placeholder = "First Name"
                    type = "text"
                    value = ""
                    onChange = {() => {}}
                  />
                </Col>
                <Col md = {6}>
                <Input
                    Label = "Last Name"
                    placeholder = "Last Name"
                    type = "text"
                    value = ""
                    onChange = {() => {}}
                  />
                </Col>
              </Row>
              <Input
                Label = "Email address"
                placeholder = "Enter email"
                type = "email"
                value = ""  
                onChange = {() => {}}
                errorMessage = "We'll never share your email with anyone else."
              />
              <Input
                Label = "Password"
                placeholder = "Enter Password"
                type = "password"
                value = ""  
                onChange = {() => {}}
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